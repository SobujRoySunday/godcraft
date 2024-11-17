import Container from '@/components/Container'
import Image from 'next/image';
import React from 'react'

const builds = [
    {
        name: 'Build 1',
        description: 'This is a build description',
        image: '/assets/build.jpg',
    },
    {
        name: 'Build 2',
        description: 'This is a build description',
        image: '/assets/build.jpg',
    },
    {
        name: 'Build 3',
        description: 'This is a build description',
        image: '/assets/build.jpg',
    }
];

const Builds = () => {
    return (
        <Container>
            <div className='p-4 flex flex-col justify-center items-center gap-8'>
                <h2>Builds</h2>
                {builds.length > 0 && builds.map((build) => (
                    <div key={build.name} className='flex flex-row w-full border-[1px] border-gray-500'>
                        <div className='w-1/3'>
                            <Image src={build.image} alt={build.name} width={1280} height={360} className='w-full h-full object-contain' />
                        </div>
                        <div className='w-2/3 p-4 flex flex-col gap-4'>
                            <h3 className='text-2xl font-semibold'>{build.name}</h3>
                            <p className='text-gray-400'>{build.description}</p>
                            <div className='flex justify-end gap-2'>
                                <button className='text-white font-semibold py-2 px-8 border-2 hover:bg-gray-900 transition-all'>Schematics</button>
                                <button className='text-white font-semibold py-2 px-8 border-2 hover:bg-gray-900 transition-all'>World</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Container>
    )
}

export default Builds