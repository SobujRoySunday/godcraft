import React from 'react'
import Container from './Container'
import Image from 'next/image'
import { contributors } from '@/constants'
import Quote from './Quote/Quote'

const TopContributors = () => {
    return (
        <Container>
            <h2>Our Top Contributors</h2>
            <div className='flex flex-wrap gap-8 p-4 justify-center'>
                {contributors.map((contributor) => (
                    <div key={contributor.name} className='w-[250px] flex flex-col items-center border border-gray-600 rounded-lg p-4 gap-1'>
                        <Image src={contributor.image} alt={contributor.name} width={160} height={160} className='w-40 h-40 object-cover rounded-full' />
                        <h3 className='text-xl font-semibold'>{contributor.name}</h3>
                        <p className='text-gray-400 text-sm'>{contributor.tags.join(', ')}</p>
                        <Quote text={contributor.message} />
                    </div>
                ))}
            </div>
        </Container>
    )
}

export default TopContributors