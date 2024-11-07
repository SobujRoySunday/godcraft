import React from 'react'
import Image from 'next/image'
import { logoImage } from '@/utils'

const Navbar = () => {
    return (
        <header className='flex items-center justify-center'>
            <div className='flex flex-row items-center gap-2 px-4 py-2'>
                <Image src={logoImage} alt="logo" width={20} height={20} priority />
                <h1 className='text-lg'>Godcraft</h1>
            </div>
        </header>
    )
}

export default Navbar