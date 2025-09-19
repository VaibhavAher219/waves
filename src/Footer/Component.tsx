import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const footerData: Footer | null = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-auto border-t border-gray-200 bg-gray-50 dark:bg-gray-900">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Wave Branding */}
          <div className="md:col-span-2">
            <Link className="flex items-center mb-6" href="/">
              <Logo />
            </Link>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md leading-relaxed">
              AI-powered damage assessment that creates, validates, and delivers full property 
              claim estimates—reducing cycle time and accelerating cash flow.
            </p>
            <div className="flex space-x-4">
              <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300">
                Join the Waitlist
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-1">
            <h3 className="text-gray-900 dark:text-white font-semibold mb-4">Navigation</h3>
            <nav className="flex flex-col space-y-3">
              {navItems.map(({ link }, i) => {
                return (
                  <CMSLink 
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" 
                    key={i} 
                    {...link} 
                  />
                )
              })}
            </nav>
          </div>

          {/* Additional Links */}
          <div className="md:col-span-1">
            <h3 className="text-gray-900 dark:text-white font-semibold mb-4">Resources</h3>
            <nav className="flex flex-col space-y-3">
              <Link href="/posts" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Blog
              </Link>
              <Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Contact
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            © 2024 Wave. All rights reserved.
          </p>
          <div className="flex items-center mt-4 md:mt-0">
            <ThemeSelector />
          </div>
        </div>
      </div>
    </footer>
  )
}
