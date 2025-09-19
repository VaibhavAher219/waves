'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title'>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  return (
    <article
      className={cn(
        'group bg-white rounded-2xl border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden hover:cursor-pointer hover:-translate-y-1',
        className,
      )}
      ref={card.ref}
    >
      <div className="relative w-full aspect-[16/9] bg-gradient-to-br from-gray-50 to-gray-100">
        {!metaImage && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-gray-400 text-center">
              <div className="w-16 h-16 mx-auto mb-2 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm font-medium">Wave Article</p>
            </div>
          </div>
        )}
        {metaImage && typeof metaImage !== 'string' && (
          <Media 
            resource={metaImage} 
            size="33vw" 
            imgClassName="object-cover w-full h-full" 
          />
        )}
      </div>
      
      <div className="p-6">
        {showCategories && hasCategories && (
          <div className="flex flex-wrap gap-2 mb-4">
            {categories?.map((category, index) => {
              if (typeof category === 'object') {
                const { title: titleFromCategory } = category
                const categoryTitle = titleFromCategory || 'Untitled category'

                return (
                  <span 
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100"
                  >
                    {categoryTitle}
                  </span>
                )
              }
              return null
            })}
          </div>
        )}
        
        {titleToUse && (
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
            <Link className="hover:no-underline" href={href} ref={link.ref}>
              {titleToUse}
            </Link>
          </h3>
        )}
        
        {description && (
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
            {sanitizedDescription}
          </p>
        )}
        
        <div className="mt-4 flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700 transition-colors">
          Read Article
          <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </article>
  )
}
