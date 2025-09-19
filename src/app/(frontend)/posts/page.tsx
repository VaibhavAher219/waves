import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  let posts: any = { docs: [], totalDocs: 0, page: 1, totalPages: 1 }

  // Skip database connection if not available during build
  if (!process.env.DATABASE_URI) {
    console.warn('DATABASE_URI not available, using empty posts data')
  } else {
    try {
      const payload = await getPayload({ config: configPromise })

      posts = await payload.find({
        collection: 'posts',
        depth: 1,
        limit: 12,
        overrideAccess: false,
        select: {
          title: true,
          slug: true,
          categories: true,
          meta: true,
        },
      })
    } catch (error) {
      console.warn('Failed to fetch posts:', error)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <PageClient />
      
      {/* Wave-style header section with dotted background */}
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
            Wave Blog
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Insights, updates, and stories from the Wave team—delivering the latest in AI-powered damage assessment and claims processing.
          </p>
          
          {/* Wave visualization */}
          <div className="mt-16 flex justify-center">
            <div className="flex items-end space-x-1 h-16">
              {Array.from({ length: 50 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-sm animate-wave-pulse"
                  style={{
                    width: '4px',
                    height: `${Math.sin(i * 0.3) * 20 + 30}px`,
                    animationDelay: `${i * 0.1}s`
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Blog posts section */}
      <div className="py-16">
        <div className="container mb-8">
          <PageRange
            collection="posts"
            currentPage={posts.page}
            limit={12}
            totalDocs={posts.totalDocs}
          />
        </div>

        <CollectionArchive posts={posts.docs as any} />

        <div className="container mt-16">
          {posts.totalPages > 1 && posts.page && (
            <Pagination page={posts.page} totalPages={posts.totalPages} />
          )}
        </div>
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Wave Blog - AI-Powered Damage Assessment Insights`,
    description: `Discover the latest insights, updates, and stories from Wave. Learn about AI-powered damage assessment, claims processing innovation, and industry trends that are transforming insurance workflows.`,
  }
}
