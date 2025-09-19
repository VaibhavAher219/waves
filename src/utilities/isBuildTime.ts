/**
 * Utility to detect if we're in a build-time environment where database connections should be avoided
 */
export function isBuildTime(): boolean {
  // Check multiple indicators that we're in a build environment
  return (
    // No DATABASE_URI available
    !process.env.DATABASE_URI ||
    // Vercel build environment
    process.env.VERCEL_ENV === 'preview' ||
    // Next.js build process
    process.env.NODE_ENV === 'production' && !process.env.VERCEL_URL ||
    // CI environment
    process.env.CI === 'true'
  )
}

/**
 * Safely execute a database operation, returning null/fallback during build time
 */
export async function safeDbOperation<T>(
  operation: () => Promise<T>,
  fallback: T,
  operationName: string = 'database operation'
): Promise<T> {
  if (isBuildTime()) {
    console.warn(`Skipping ${operationName} during build time`)
    return fallback
  }

  try {
    return await operation()
  } catch (error) {
    console.warn(`Failed ${operationName}:`, error)
    return fallback
  }
}
