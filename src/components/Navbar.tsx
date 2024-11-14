import React from 'react'
import Image from 'next/image'
import { logoImage, navItems, searchImage } from '@/constants'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { verifyAuthToken } from '@/lib/auth'

interface User {
    id: string,
    email: string,
    name: string,
    picture: string
}

const Navbar = async () => {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('auth-token')?.value;

    let userData = null;
    if (authToken) {
        userData = await verifyAuthToken(authToken) as User;
    }

    return (
        <header className='w-full'>
            <nav className='w-8/12 mx-auto flex items-center justify-between p-4'>
                <Link href="/">
                    <Image src={logoImage} alt="logo" width={17} height={18} className='hover:scale-110 transition-all' />
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
                <div className='flex gap-4'>
                    <Image src={searchImage} alt="search" width={16} height={16} className='hover:scale-110 transition-all object-contain' />
                    {userData && (
                        <Link href={`/profile/${userData.id}`} >
                            <Image src={userData.picture} alt='profile' width={20} height={20} className='rounded-full object-contain hover:scale-110 transition-all' />
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    )
}

export default Navbar