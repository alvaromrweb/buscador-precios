import React from 'react'

export default function Spinner() {
  return (
    <>
        <div className='spinner'></div>

        <style jsx>{`
        .spinner {
        border: 4px solid rgba(255, 255, 255, .2);
        border-left-color: white;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        }
        @keyframes spin {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
        }
        `}</style>
    </>
  )
}
