import React from 'react'

import type { Page } from '@/payload-types'

import RichText from '@/components/RichText'

type LowImpactHeroType =
  | {
      children?: React.ReactNode
      richText?: never
    }
  | (Omit<Page['hero'], 'richText'> & {
      children?: never
      richText?: Page['hero']['richText']
    })

export const LowImpactHero: React.FC<LowImpactHeroType> = ({ children, richText }) => {
  return (
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
          {children || (richText && (
            <RichText 
              className="text-gray-900 prose-wave" 
              data={richText} 
              enableGutter={false} 
            />
          ))}
        </div>
      </div>
    </div>
  )
}
