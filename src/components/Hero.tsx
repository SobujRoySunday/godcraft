"use client"

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React from 'react'
import { playerImages } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'

const Hero = () => {
    useGSAP(() => {
        gsap.to('#heading', {
            opacity: 1
        })

        setInterval(() => {
            gsap.fromTo('#period', {
                duration: 0.5,
                opacity: 0
            }, {
                delay: 0.5,
                opacity: 1
            });
        }, 3000)

        gsap.to('.player', {
            y: 0,
            ease: 'power4.out',
            stagger: 0.1
        })

        gsap.to('#buttons', {
            y: 0,
            ease: 'power4.out',
        })

    }, []);

    return (
        <section className="w-8/12 mx-auto h-[calc(100vh-56px)] flex flex-col justify-center items-center gap-10">
            <h2 id='heading' className="w-full text-center opacity-0">
                Ultimate Minecrafting Experience<span id='period'>.</span>
            </h2>
            <div className='w-2/3 flex flex-row justify-between items-center'>
                <div className='flex flex-col justify-center items-center -translate-y-40 player gap-4'>
                    <Image src={playerImages[0]} alt="player one" width={150} height={150} className='h-[200px] w-auto hover:scale-110 transition-all' />
                    <h4 className='text-sm font-extralight text-gray-400 tracking-wider'>Explore</h4>
                </div>
                <div className='flex flex-col justify-center items-center -translate-y-40 player gap-4'>
                    <Image src={playerImages[1]} alt="player one" width={150} height={150} className='h-[200px] w-auto hover:scale-110 transition-all' />
                    <h4 className='text-sm font-extralight text-gray-400 tracking-wider'>Build</h4>
                </div>
                <div className='flex flex-col justify-center items-center -translate-y-40 player gap-4'>
                    <Image src={playerImages[2]} alt="player three" width={150} height={150} className='h-[200px] w-auto hover:scale-110 transition-all' />
                    <h4 className='text-sm font-extralight text-gray-400 tracking-wider'>Fight</h4>
                </div>
            </div>
            <div id='buttons' className='flex flex-row justify-center items-center gap-4 translate-y-20'>
                <Link href="/builds" className='text-sm border-2 border-blue-500 rounded-lg px-4 py-2 hover:bg-blue-500 tranision-all'>Explore</Link>
                <Link href="/login" className='text-sm border-2 border-blue-500 bg-blue-500 rounded-lg px-4 py-2 hover:bg-blue-700 hover:border-blue-700 tranision-all'>Join us</Link>
            </div>
        </section>
    )
}

export default Hero