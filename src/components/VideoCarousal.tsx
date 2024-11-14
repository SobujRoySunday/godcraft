"use client"

import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

import { highlightVideos } from '@/constants'
import Container from './Container'

const VideoCarousal = () => {
    const videoRefs = useRef<HTMLVideoElement[] | null[]>([])
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    const reset = () => {
        videoRefs.current.forEach((video) => {
            gsap.set(video, {
                x: 0,
                duration: 1,
                ease: 'power2.inOut',
            })
        })
    }

    const handleChange = (index: number) => {
        reset();
        setCurrentVideoIndex(index);
    }

    useEffect(() => {
        const videos = videoRefs.current as HTMLVideoElement[];
        const thisVideo = videos[currentVideoIndex];

        const onVideoEnd = () => {
            if (currentVideoIndex < videos.length - 1) {
                gsap.to(thisVideo, {
                    x: (currentVideoIndex * -100) - 100 + '%',
                    duration: 1,
                    ease: 'power2.inOut',
                });
                setCurrentVideoIndex(currentVideoIndex + 1);
            } else {
                setCurrentVideoIndex(0);
                reset();
            }
        };

        gsap.to(thisVideo, {
            x: (currentVideoIndex * -100) + '%',
            duration: 1,
            ease: 'power2.inOut',
        });
        thisVideo.play().catch(() => {
            console.error('Failed to play video');
            thisVideo.pause();
        });

        thisVideo.addEventListener('ended', onVideoEnd);
        return () => thisVideo.removeEventListener('ended', onVideoEnd);
    }, [currentVideoIndex]);

    return (
        <Container>
            <h2>Get highlights</h2>
            <div
                className='flex flex-row overflow-hidden w-full m-8 rounded-lg'
            >
                {highlightVideos.map(
                    (src, index) => (
                        <video
                            key={index}
                            ref={(el) => {
                                videoRefs.current[index] = el
                                return videoRefs.current[index] as unknown as void;
                            }}
                            style={{
                                minWidth: '100%',
                                height: 'auto',
                            }}
                            playsInline
                            muted
                            preload="auto"
                        >
                            <source src={src} type='video/mp4' />
                        </video>
                    )
                )}
            </div>
            <div className='flex flex-row p-2 gap-2 self-center'>
                {highlightVideos.map((_, index) => (
                    <button
                        key={index}
                        className={`text-sm transition-all p-2 rounded-full w-12 h-12 flex items-center justify-center ${index === currentVideoIndex ? 'text-white' : 'text-gray-400'} hover:text-white border-2 ${index === currentVideoIndex ? 'border-white' : 'border-gray-400'} hover:border-white`}
                        onClick={() => handleChange(index)}
                    >{index + 1}</button>
                ))}
            </div>
        </Container>
    )
}

export default VideoCarousal