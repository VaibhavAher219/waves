import clsx from 'clsx'
import React from 'react'
import RichText from '@/components/RichText'

import type { Post } from '@/payload-types'

import { Card } from '../../components/Card'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

export type RelatedPostsProps = {
  className?: string
  docs?: Post[]
  introContent?: SerializedEditorState
}

export const RelatedPosts: React.FC<RelatedPostsProps> = (props) => {
  const { className, docs, introContent } = props

  return (
    <div className={clsx('w-full', className)}>
      {introContent && (
        <div className="mb-8">
          <RichText data={introContent} enableGutter={false} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {docs?.map((doc, index) => {
          if (typeof doc === 'string') return null

          return (
            <div key={index} className="w-full">
              <Card 
                doc={doc} 
                relationTo="posts" 
                showCategories 
                className="h-full"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
