import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { formatAuthors } from '@/utilities/formatAuthors'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, heroImage, populatedAuthors, publishedAt, title } = post

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  return (
    <div className="relative bg-white">
      {/* Wave-style header with dotted background */}
      <div className="relative pt-32 pb-16 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        {/* Dotted pattern background */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full" style={{
            backgroundImage: `radial-gradient(circle, #e5e7eb 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}></div>
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Categories */}
            {categories && categories.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {categories.map((category, index) => {
                  if (typeof category === 'object' && category !== null) {
                    const { title: categoryTitle } = category
                    const titleToUse = categoryTitle || 'Untitled category'

                    return (
                      <span 
                        key={index}
                        className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-100"
                      >
                        {titleToUse}
                      </span>
                    )
                  }
                  return null
                })}
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              {title}
            </h1>

            {/* Meta information */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-gray-600">
              {hasAuthors && (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {formatAuthors(populatedAuthors).charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="font-medium">{formatAuthors(populatedAuthors)}</span>
                </div>
              )}
              {publishedAt && (
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <time dateTime={publishedAt} className="font-medium">
                    {formatDateTime(publishedAt)}
                  </time>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hero image section */}
      {heroImage && typeof heroImage !== 'string' && (
        <div className="relative">
          <div className="aspect-[21/9] md:aspect-[21/8] lg:aspect-[21/7] overflow-hidden">
            <Media 
              resource={heroImage} 
              priority 
              fill
              imgClassName="object-cover w-full h-full"
            />
          </div>
          {/* Subtle overlay for better text readability if needed */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
        </div>
      )}
    </div>
  )
}
