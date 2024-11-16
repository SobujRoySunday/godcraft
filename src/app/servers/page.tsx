import Container from '@/components/Container'
import Image from 'next/image'
import React from 'react'

const servers = [
    {
        name: "GodCraft Public Network",
        image: "/assets/minecraft.jpg",
        description: "Whether you're a builder, explorer, or adventurer, our server offers a thriving community, engaging gameplay modes, and a world full of endless possibilities. Join forces with fellow players, participate in exciting events, and showcase your creativity in a server designed for all Minecraft enthusiasts. With a focus on fun, innovation, and collaboration, GodCraft is the perfect place to make your mark."
    },
    {
        name: "Martians Technical Server",
        image: "/assets/minecraft.jpg",
        description: "Whether you're a builder, explorer, or adventurer, our server offers a thriving community, engaging gameplay modes, and a world full of endless possibilities. Join forces with fellow players, participate in exciting events, and showcase your creativity in a server designed for all Minecraft enthusiasts. With a focus on fun, innovation, and collaboration, GodCraft is the perfect place to make your mark."
    }
]

const Servers = () => {
    return (
        <Container>
            <div className='p-4 flex flex-col justify-center items-center gap-8'>
                <h2>Our minecraft servers</h2>
                {servers.length > 0 && servers.map((server) => (
                    <>
                        <div className='flex flex-col w-full border-[1px] border-gray-500'>
                            <Image src={server.image} alt="Servers" width={1280} height={360} className='w-full h-full object-contain' />
                            <div className='p-4 flex flex-col gap-4'>
                                <h3 className='text-2xl font-semibold'>{server.name}</h3>
                                <p className='text-gray-400'>{server.description}</p>
                                <div className='flex justify-end gap-2'>
                                    <button className='text-white font-semibold py-2 px-8 border-2 hover:bg-gray-900 transition-all'>Join</button>
                                    <button className='text-white font-semibold py-2 px-8 border-2 hover:bg-gray-900 transition-all'>Download world</button>
                                </div>
                            </div>
                        </div>
                    </>
                ))}
            </div>
        </Container>
    )
}

export default Servers