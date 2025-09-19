import canUseDOM from './canUseDOM'

export const getServerSideURL = () => {
  let url = process.env.NEXT_PUBLIC_SERVER_URL

  if (!url && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    // Ensure VERCEL_PROJECT_PRODUCTION_URL has https:// prefix
    const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
    url = vercelUrl.startsWith('http') ? vercelUrl : `https://${vercelUrl}`
  }

  if (!url) {
    url = 'http://localhost:3000'
  }

  return url
}

export const getClientSideURL = () => {
  if (canUseDOM) {
    const protocol = window.location.protocol
    const domain = window.location.hostname
    const port = window.location.port

    return `${protocol}//${domain}${port ? `:${port}` : ''}`
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
    return vercelUrl.startsWith('http') ? vercelUrl : `https://${vercelUrl}`
  }

  return process.env.NEXT_PUBLIC_SERVER_URL || ''
}
