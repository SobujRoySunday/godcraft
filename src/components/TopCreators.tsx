import React from 'react'
import Container from './Container'
import Image from 'next/image'
import Link from 'next/link'
import { creators } from '@/constants'


const TopCreators = () => {
    return (
        <Container>
            <h2>Our Top Creators</h2>
            <div className='flex flex-wrap gap-8 p-4 justify-center'>
                {creators.map((creator) => (
                    <div key={creator.name} className='flex flex-col items-center border border-gray-600 rounded-lg p-4 gap-1'>
                        <Image src={creator.image} alt={creator.name} width={160} height={160} className='w-40 h-40 object-cover rounded-full' />
                        <h3 className='text-xl font-semibold'>{creator.name}</h3>
                        <p className='text-gray-400 text-sm'>{creator.tags.join(', ')}</p>
                        <p className='text-gray-400 text-sm'>Followers: <span className='text-white border-2 border-gray-600 rounded-full px-2'>{creator.followers}</span></p>
                        <div className='flex gap-2 items-center justify-center'>
                            <Link href={creator.socials.youtube} target='_blank' rel='noopener noreferrer'>
                                <Image src="/assets/youtube.png" alt="YouTube" width={24} height={24} className='h-6 object-contain' />
                            </Link>
                            <Link href={creator.socials.instagram} target='_blank' rel='noopener noreferrer'>
                                <Image src="/assets/instagram.webp" alt="Instagram" width={24} height={24} className='h-6 object-contain' />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </Container>
    )
}

export default TopCreators