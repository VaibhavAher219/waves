'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('light')
  })

  return (
    <div className="relative pt-32 pb-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Dotted pattern background */}
      <div className="absolute inset-0 opacity-30">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle, #e5e7eb 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}></div>
      </div>
      
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {richText && (
            <div className="mb-8">
              <RichText 
                className="text-gray-900 prose-wave" 
                data={richText} 
                enableGutter={false} 
              />
            </div>
          )}
          
          {Array.isArray(links) && links.length > 0 && (
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              {links.map(({ link }, i) => {
                return (
                  <CMSLink 
                    key={i} 
                    {...link}
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  />
                )
              })}
            </div>
          )}
          
          {/* Wave visualization */}
          <div className="flex justify-center">
            <div className="flex items-end space-x-1 h-20">
              {Array.from({ length: 60 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-sm animate-wave-pulse"
                  style={{
                    width: '4px',
                    height: `${Math.sin(i * 0.2) * 25 + 35}px`,
                    animationDelay: `${i * 0.08}s`
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Background image overlay if media exists */}
      {media && typeof media === 'object' && (
        <div className="absolute inset-0 -z-10 opacity-10">
          <Media fill imgClassName="object-cover" priority resource={media} />
        </div>
      )}
    </div>
  )
}
