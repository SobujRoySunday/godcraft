import React from 'react'
import Image from 'next/image'
import { logoImage, navItems, searchImage } from '@/constants'
import Link from 'next/link'

const Navbar = () => {
    return (
        <header className='w-screen'>
            <nav className='w-8/12 mx-auto flex items-center justify-between p-4'>
                <Link href="/">
                    <Image src={logoImage} alt="logo" width={17} height={18} className='hover:scale-110 transition-all' priority />
                </Link>
                <ul className='flex items-center gap-8'>
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <Link href={item.href} className='text-sm text-gray-400 hover:text-white transition-all'>
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
                <Image src={searchImage} alt="search" width={16} height={16} className='hover:scale-110 transition-all' priority />
            </nav>
        </header>
    )
}

export default Navbar