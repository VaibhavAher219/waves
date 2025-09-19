import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

const getPostsSitemap = unstable_cache(
  async () => {
    const SITE_URL =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : null) ||
      'https://example.com'

    const dateFallback = new Date().toISOString()

    // Skip database connection if not available
    if (!process.env.DATABASE_URI) {
      console.warn('DATABASE_URI not available, using fallback sitemap for posts')
      return [
        {
          loc: `${SITE_URL}/posts/digital-horizons`,
          lastmod: dateFallback,
        },
        {
          loc: `${SITE_URL}/posts/global-gaze`,
          lastmod: dateFallback,
        },
        {
          loc: `${SITE_URL}/posts/dollar-and-sense-the-financial-forecast`,
          lastmod: dateFallback,
        },
      ]
    }

    try {
      const payload = await getPayload({ config })
      const results = await payload.find({
        collection: 'posts',
        overrideAccess: false,
        draft: false,
        depth: 0,
        limit: 1000,
        pagination: false,
        where: {
          _status: {
            equals: 'published',
          },
        },
        select: {
          slug: true,
          updatedAt: true,
        },
      })

      const sitemap = results.docs
        ? results.docs
            .filter((post) => Boolean(post?.slug))
            .map((post) => ({
              loc: `${SITE_URL}/posts/${post?.slug}`,
              lastmod: post.updatedAt || dateFallback,
            }))
        : []

      return sitemap
    } catch (error) {
      console.warn('Failed to generate posts sitemap from database:', error)
      return [
        {
          loc: `${SITE_URL}/posts/digital-horizons`,
          lastmod: dateFallback,
        },
        {
          loc: `${SITE_URL}/posts/global-gaze`,
          lastmod: dateFallback,
        },
        {
          loc: `${SITE_URL}/posts/dollar-and-sense-the-financial-forecast`,
          lastmod: dateFallback,
        },
      ]
    }
  },
  ['posts-sitemap'],
  {
    tags: ['posts-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getPostsSitemap()

  return getServerSideSitemap(sitemap)
}
