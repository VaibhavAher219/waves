import clsx from 'clsx'
import Image from 'next/image'
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
      <Image 
        src="/media/WAVE transparent black.png" 
        alt="Wave"
        width={120}
        height={32}
        className="h-8 w-auto"
        loading={loading}
        priority={priority === 'high'}
      />
    </div>
  )
}
