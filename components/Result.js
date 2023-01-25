import React from 'react'
import Image from 'next/image'

export default function Result({result}) {
  return (
    <div className='w-full rounded-lg bg-slate-700 hover:bg-slate-600 shadow-lg transition-colors'>
      <a href={result.link} target="_blank">
        <div className='flex flex-col md:flex-row md:space-x-4 items-center md:items-stretch text-left p-5 relative'>
          {result.img && (
            <div className='mb-4 md:mb-0'>
                <Image src={result.img} width={104} height={104} alt={`Imagen resultado ${result.title}`} className="text-white object-contain" />
            </div>
          )}
          <div className='relative flex-1 text-center md:text-left'>
            <h3 className='text-white text-xl 2xl:text-3xl font-bold mb-1'>{result.title}</h3>
            <p className='text-sm text-gray-400'>{result.description}</p>
            {result.price && (
              <p className='text-xl text-white font-bold'>{result.price} €</p>
            )}
          </div>

          <div className='absolute right-4 top-4'>
            <div className='flex gap-2 itesm-center'>
              <Image src={result.webImg} width={18} height={18} alt={`Icono web ${result.web}`} />
              <small className='text-gray-200 hidden md:block'>{result.web}</small>
            </div>
          </div>
        </div>
      </a>
    </div>
  )
}
