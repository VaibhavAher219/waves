import type { Metadata } from 'next/types'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Resource } from '@/payload-types'

export const dynamic = 'force-static'
export const revalidate = 600

const resourceTypes = [
  { label: 'All Resources', value: 'all' },
  { label: 'Case Studies', value: 'case-study' },
  { label: 'Templates', value: 'template' },
  { label: 'Tools', value: 'tool' },
  { label: 'eBooks', value: 'ebook' },
  { label: 'Tutorial Videos', value: 'tutorial-video' },
  { label: 'Events', value: 'event' },
  { label: 'Help & Support', value: 'help-support' },
]

export default async function ResourcesPage() {
  let resources = { docs: [], totalDocs: 0, page: 1, totalPages: 1 }

  // Skip database connection if not available during build
  if (!process.env.DATABASE_URI) {
    console.warn('DATABASE_URI not available, using empty resources data')
  } else {
    try {
      const payload = await getPayload({ config: configPromise })

      resources = await payload.find({
        collection: 'resources',
        depth: 1,
        limit: 12,
        overrideAccess: false,
        select: {
          title: true,
          slug: true,
          resourceType: true,
          excerpt: true,
          featuredImage: true,
          meta: true,
          content: true,
          updatedAt: true,
          createdAt: true,
        },
      })
    } catch (error) {
      console.warn('Failed to fetch resources:', error)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Resource Center Header */}
      <div className="relative pt-32 pb-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        {/* Dotted pattern background */}
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full" style={{
            backgroundImage: `radial-gradient(circle, #e5e7eb 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}></div>
        </div>
        
        <div className="container relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Resource Center
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Everything you need to transform your estimate report generation with Wave&apos;s AI-powered damage assessment technology.
          </p>
        </div>
      </div>

      {/* Resource Categories */}
      <div className="py-16 border-b border-gray-200">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-4">
            {resourceTypes.map((type) => (
              <Link
                key={type.value}
                href={type.value === 'all' ? '/resource-center' : `/resource-center?type=${type.value}`}
                className="inline-flex items-center px-6 py-3 rounded-full bg-white border border-gray-200 text-gray-700 hover:border-blue-500 hover:text-blue-600 transition-all duration-300 font-medium"
              >
                {type.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="py-16">
        <div className="container mb-8">
          <PageRange
            collectionLabels={{ plural: 'Resources', singular: 'Resource' }}
            currentPage={resources.page}
            limit={12}
            totalDocs={resources.totalDocs}
          />
        </div>

        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.docs?.map((resource, index) => {
              if (typeof resource === 'object' && resource !== null) {
                return (
                  <div key={index} className="w-full">
                    <ResourceCard resource={resource} />
                  </div>
                )
              }
              return null
            })}
          </div>
        </div>

        <div className="container mt-16">
          {resources.totalPages > 1 && resources.page && (
            <Pagination page={resources.page} totalPages={resources.totalPages} />
          )}
        </div>
      </div>
    </div>
  )
}

// Resource Card Component
function ResourceCard({ resource }: { resource: Resource }) {
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'case-study':
        return '📊'
      case 'template':
        return '📋'
      case 'tool':
        return '🛠️'
      case 'ebook':
        return '📚'
      case 'tutorial-video':
        return '🎥'
      case 'event':
        return '📅'
      case 'help-support':
        return '💬'
      default:
        return '📄'
    }
  }

  return (
    <article className="group bg-white rounded-2xl border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden hover:-translate-y-1">
      {/* Resource Image */}
      <div className="relative w-full aspect-[16/9] bg-gradient-to-br from-gray-50 to-gray-100">
        {resource.featuredImage && typeof resource.featuredImage === 'object' && resource.featuredImage.url ? (
          <Image 
            src={resource.featuredImage.url || ''} 
            alt={resource.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl">{getResourceIcon(resource.resourceType)}</div>
          </div>
        )}
      </div>
      
      <div className="p-6">
        {/* Resource Type Badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">{getResourceIcon(resource.resourceType)}</span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
            {resource.resourceType.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
          </span>
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
          <Link href={`/resource-center/${resource.slug || resource.id}`} className="hover:no-underline">
            {resource.title}
          </Link>
        </h3>
        
        {/* Excerpt */}
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
          {resource.excerpt}
        </p>
        
        {/* CTA */}
        <div className="flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700 transition-colors">
          View Resource
          <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </article>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Wave Resource Center - AI Damage Assessment Resources`,
    description: `Access case studies, templates, tools, eBooks, tutorial videos, and more to transform your claims processing with Wave's AI technology.`,
  }
}
