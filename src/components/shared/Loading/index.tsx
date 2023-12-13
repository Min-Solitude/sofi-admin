import React from 'react'

export default function Loading() {
    return (
        <div className='fixed top-0 left-0 bottom-0 right-0 bg-[#000000cc] flex justify-center items-center z-50'>
            <span className="loading loading-spinner loading-lg bg-white"></span>
        </div>
    )
}
