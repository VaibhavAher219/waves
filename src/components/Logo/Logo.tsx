import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    <div className={clsx('flex items-center', className)}>
      {/* Wave Logo Image */}
      <img 
        src="/media/WAVE transparent black.png" 
        alt="Wave"
        className="h-8 w-auto"
        loading={loading}
        style={{ priority }}
      />
    </div>
  )
}
