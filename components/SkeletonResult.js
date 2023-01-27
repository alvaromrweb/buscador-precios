import React from 'react'

export default function SkeletonResult() {
  return (
    <div className='w-full rounded-lg bg-slate-700 shadow-lg p-4 mx-auto animate-in fade-in duration-500'>
        <div className="animate-pulse flex flex-col md:flex-row md:space-x-4 relative">
            <div className='mb-4 md:mb-0 text-center md:text-left'>
                <div className="rounded bg-slate-600 h-24 w-24 mx-auto md:mx-0"></div>
            </div>
            <div className='relative flex-1 space-y-6 py-1'>
                <div className="h-2 bg-slate-600 rounded w-9/12 mx-auto md:mx-0"></div>
                <div className="h-2 bg-slate-600 rounded w-10/12 mx-auto md:mx-0"></div>
                <div className="h-2 bg-slate-600 rounded w-32 mx-auto md:mx-0"></div>
            </div>
            <div className='absolute right-2 top-1'>
                <div className='flex gap-2 items-center'>
                    <div className="rounded-full bg-slate-600 h-5 w-5"></div>
                    <div className="h-2 bg-slate-600 rounded w-20 hidden md:block"></div>
                </div>
            </div>
            
        </div>
    </div>
  )
}
