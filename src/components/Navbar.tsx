'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { User } from '@/lib/types'
import { logoImage, navItems, searchImage, logoutImage, discordImage } from '@/constants'
import { useRouter } from 'next/navigation'

const Navbar = () => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    const getAndSetUserDataFromServerSide = async (): Promise<User | null> => {
        const response = await fetch(`/api/auth/getAuthTokenData`);
        if (response.status !== 200) return null;
        const data = await response.json();
        setUser(data);
        return data;
    }

    const handleLogout = async () => {
        setUser(null);
        router.push('/api/auth/logout');
    }

    useEffect(() => {
        getAndSetUserDataFromServerSide();
    }, []);

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
                    <li>
                        <Link href='https://discord.com/invite/7qEqykx7wB' target='_blank'>
                            <Image src={discordImage} alt='discord' width={16} height={16} className='object-contain hover:scale-110 transition-all' />
                        </Link>
                    </li>
                </ul>
                <div className='flex gap-4'>
                    <Image src={searchImage} alt="search" width={16} height={16} className='hover:scale-110 transition-all object-contain' />
                    {user && (
                        <>
                            <Link href={`/profile/${user.id}`} >
                                <Image src={user.picture} alt='profile' width={20} height={20} className='rounded-full object-contain hover:scale-110 transition-all' />
                            </Link>
                            <button className='text-sm text-gray-400 hover:text-white transition-all' onClick={handleLogout}>
                                <Image src={logoutImage} alt='logout' width={20} height={20} className='rounded-full object-contain hover:scale-110 transition-all invert' />
                            </button>
                        </>
                    )}
                </div>
            </nav>
        </header>
    )
}

export default Navbar