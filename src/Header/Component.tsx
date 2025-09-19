import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header } from '@/payload-types'

export async function Header() {
  const headerData: Header | null = await getCachedGlobal('header', 1)()

  // Provide fallback data if database is not available
  const fallbackData: Header = {
    id: 1,
    navItems: [],
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  }

  return <HeaderClient data={headerData || fallbackData} />
}
