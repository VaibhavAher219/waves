import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'
import { safeDbOperation } from './isBuildTime'

export async function getRedirects(depth = 1) {
  return safeDbOperation(
    async () => {
      const payload = await getPayload({ config: configPromise })
      const { docs: redirects } = await payload.find({
        collection: 'redirects',
        depth,
        limit: 0,
        pagination: false,
      })
      return redirects
    },
    [],
    'redirects fetch'
  )
}

/**
 * Returns a unstable_cache function mapped with the cache tag for 'redirects'.
 *
 * Cache all redirects together to avoid multiple fetches.
 */
export const getCachedRedirects = () =>
  unstable_cache(async () => getRedirects(), ['redirects'], {
    tags: ['redirects'],
  })
