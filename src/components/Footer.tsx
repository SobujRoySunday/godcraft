import React from 'react'

const Footer = () => {
    return (
        <footer className='w-full'>
            <div className='w-8/12 mx-auto flex items-center justify-between p-4'>
                <div className='flex items-center gap-8'>
                    <p className='text-sm text-gray-400'>© 2024 Godcraft. All rights reserved.</p>
                </div>
                <div className='flex items-center gap-8'>
                    <p className='text-sm text-gray-400'>Terms of Service</p>
                    <p className='text-sm text-gray-400'>Privacy Policy</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer