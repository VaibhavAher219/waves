'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ChevronDownIcon } from 'lucide-react'

import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'

const resourceTypes = [
  { label: 'All Resources', value: 'all', href: '/resource-center' },
  { label: 'Case Studies', value: 'case-study', href: '/resource-center?type=case-study' },
  { label: 'Templates', value: 'template', href: '/resource-center?type=template' },
  { label: 'Tools', value: 'tool', href: '/resource-center?type=tool' },
  { label: 'eBooks', value: 'ebook', href: '/resource-center?type=ebook' },
  { label: 'Tutorial Videos', value: 'tutorial-video', href: '/resource-center?type=tutorial-video' },
  { label: 'Events', value: 'event', href: '/resource-center?type=event' },
  { label: 'Help & Support', value: 'help-support', href: '/resource-center?type=help-support' },
]

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const [isResourceDropdownOpen, setIsResourceDropdownOpen] = useState(false)
  
  // Main site URL for linking back to Wave landing page
  const MAIN_SITE_URL = process.env.NEXT_PUBLIC_MAIN_SITE_URL || 'https://buildwithwave.com'

  return (
    <nav className="flex gap-8 items-center">
      {/* Main site navigation */}
      <Link 
        href={MAIN_SITE_URL}
        className="text-gray-600 hover:text-gray-900 transition-colors font-medium text-sm"
        target="_self"
      >
        Home
      </Link>
      
      {/* Resource Center dropdown */}
      <div 
        className="relative group"
        onMouseEnter={() => setIsResourceDropdownOpen(true)}
        onMouseLeave={() => setIsResourceDropdownOpen(false)}
      >
        <button
          className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors font-medium py-2 text-sm"
          onClick={() => setIsResourceDropdownOpen(!isResourceDropdownOpen)}
        >
          Resource Center
          <ChevronDownIcon className={`w-3 h-3 transition-transform duration-200 ${isResourceDropdownOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {/* Dropdown Menu */}
        {isResourceDropdownOpen && (
          <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
            {resourceTypes.map((resource) => (
              <Link
                key={resource.value}
                href={resource.href}
                className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors text-sm"
                onClick={() => setIsResourceDropdownOpen(false)}
              >
                {resource.label}
              </Link>
            ))}
          </div>
        )}
      </div>
      
      {/* Blog link */}
      <Link 
        href="/posts"
        className="text-gray-600 hover:text-gray-900 transition-colors font-medium text-sm"
      >
        Blog
      </Link>
      
      {/* Testimonials link */}
      <Link 
        href="/testimonials"
        className="text-gray-600 hover:text-gray-900 transition-colors font-medium text-sm"
      >
        Testimonials
      </Link>
      
      {/* Dynamic CMS navigation items */}
      {navItems.map(({ link }, i) => {
        return <CMSLink key={`cms-${i}`} {...link} appearance="link" />
      })}
      
      {/* Login Icon */}
      <Link 
        href={`${MAIN_SITE_URL}/signin`}
        className="text-gray-600 hover:text-gray-900 transition-colors p-2"
        target="_self"
        title="Login"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </Link>
      
      {/* Join the Waitlist - Blue gradient button matching Wave brand */}
      <Link 
        href={`${MAIN_SITE_URL}/waitlist`}
        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md text-sm"
        target="_self"
      >
        Book a Demo
      </Link>
    </nav>
  )
}
