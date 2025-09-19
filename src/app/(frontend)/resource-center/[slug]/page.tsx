import type { Metadata } from 'next'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import Image from 'next/image'
import React, { cache } from 'react'
import RichText from '@/components/RichText'
import Link from 'next/link'
import { generateMeta } from '@/utilities/generateMeta'

export async function generateStaticParams() {
  // Skip static generation if no database connection is available
  if (!process.env.DATABASE_URI) {
    console.warn('DATABASE_URI not available, skipping static generation for resources')
    return []
  }

  try {
    const payload = await getPayload({ config: configPromise })
    const resources = await payload.find({
      collection: 'resources',
      draft: false,
      limit: 1000,
      overrideAccess: false,
      pagination: false,
      select: {
        slug: true,
      },
    })

    const params = resources.docs.map(({ slug }) => {
      return { slug }
    })

    return params || []
  } catch (error) {
    console.warn('Failed to generate static params for resources:', error)
    // Return empty array - resources will be generated on-demand
    return []
  }
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function ResourcePage({ params: paramsPromise }: Args) {
  const { isEnabled: _draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/resource-center/' + slug
  const resource = await queryResourceBySlug({ slug })

  if (!resource) return <PayloadRedirects url={url} />

  return (
    <article className="min-h-screen bg-white">
      <PayloadRedirects disableNotFound url={url} />

      {/* Resource Header */}
      <div className="relative pt-32 pb-16 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full" style={{
            backgroundImage: `radial-gradient(circle, #e5e7eb 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}></div>
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Resource Type Badge */}
            <div className="flex justify-center mb-8">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-100">
                {resource.resourceType.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              {resource.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              {resource.excerpt}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              {resource.downloadUrl && (
                <a
                  href={resource.downloadUrl}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download Resource
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-4-4m4 4l4-4m-4-4V4" />
                  </svg>
                </a>
              )}
              
              {resource.videoUrl && (
                <a
                  href={resource.videoUrl}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-medium rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Watch Video
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-9-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Resource Image */}
      {resource.featuredImage && typeof resource.featuredImage !== 'string' && (
        <div className="relative">
          <div className="aspect-[21/9] md:aspect-[21/8] lg:aspect-[21/7] overflow-hidden">
            <Image 
              src={typeof resource.featuredImage !== 'number' ? resource.featuredImage.url || '' : ''} 
              alt={resource.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}

      {/* Resource Content */}
      <div className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="prose-wave">
              <RichText 
                data={resource.content} 
                enableGutter={false}
                className="text-gray-700 leading-relaxed"
              />
            </div>

            {/* Event Details */}
            {resource.resourceType === 'event' && (resource.eventDate || resource.eventLocation) && (
              <div className="mt-16 p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Event Details</h3>
                {resource.eventDate && (
                  <p className="text-gray-600 mb-2">
                    <strong>Date:</strong> {new Date(resource.eventDate).toLocaleDateString()}
                  </p>
                )}
                {resource.eventLocation && (
                  <p className="text-gray-600">
                    <strong>Location:</strong> {resource.eventLocation}
                  </p>
                )}
              </div>
            )}

            {/* Back to Resource Center */}
            <div className="mt-16 text-center">
              <Link 
                href="/resource-center"
                className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                Back to Resource Center
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const resource = await queryResourceBySlug({ slug })

  return generateMeta({ doc: resource })
}

const queryResourceBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'resources',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})




