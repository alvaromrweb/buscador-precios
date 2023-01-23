import React from 'react'

export default function SkeletonResult() {
  return (
    <div className='w-full rounded-lg bg-slate-700 shadow-lg p-4 mx-auto animate-in fade-in duration-500'>
        <div className="animate-pulse flex space-x-4 relative">
            <div className='mb-4 md:mb-0'>
                <div className="rounded bg-slate-600 h-24 w-24"></div>
            </div>
            <div className='relative flex-1 space-y-6 py-1'>
                <div className="h-2 bg-slate-600 rounded w-10/12"></div>
                <div className="h-2 bg-slate-600 rounded w-11/12"></div>
            </div>
            <div className='absolute right-2 top-1'>
                <div className="h-2 bg-slate-600 rounded w-32"></div>
            </div>
            
        </div>
    </div>
  )
}
