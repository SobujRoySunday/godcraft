import React from 'react'
import Container from './Container'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'

interface Creator {
    name: string;
    image: string;
    tags: string[];
    followers: number;
    socials: {
        youtube: string;
        instagram: string;
    };
}

async function extractChannelId(url: string): Promise<string | null> {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');

    // Check for common URL formats and return the ID if directly available
    if (pathParts.includes("channel")) {
        return pathParts[pathParts.indexOf("channel") + 1]; // Channel ID is the next part in URL
    } else if (pathParts.includes("user") || pathParts[1].startsWith('@')) {
        // If we have a custom username (like @username or /user/username), use the API to get the channel ID
        const username = pathParts.includes("user") ? pathParts[pathParts.indexOf("user") + 1] : pathParts[1].substring(1);
        return username;
    }

    // Return null if the URL does not match any recognizable YouTube channel URL patterns
    return null;
}


async function fetchFollowersOfCreator(channelHandle: string): Promise<number> {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?forHandle=${channelHandle}&part=statistics&key=${process.env.YOUTUBE_DATA_API_KEY}`);

    if (!response) {
        throw new Error('Failed to fetch followers of creator');
    }

    const data = await response.json();

    return data.items[0].statistics.subscriberCount;
}


async function fetchCreators(): Promise<Creator[]> {
    const response = await fetch(`${process.env.BASE_URL}/api/fetchCreators`)
    if (!response) {
        throw new Error('Failed to fetch creators');
    }
    const creatorsData = await response.json();

    for (let i = 0; i < creatorsData.length; i++) {
        creatorsData[i].followers = await fetchFollowersOfCreator(await extractChannelId(creatorsData[i].socials.youtube) as string);
    }

    return creatorsData;
}

const TopCreators = async () => {
    const creators = await fetchCreators();

    return (
        <Container>
            <h2>Our Top Creators</h2>
            <div className='flex flex-wrap gap-8 p-4 justify-center'>
                {creators.map((creator) => (
                    <div key={creator.name} className='w-[250px] flex flex-col items-center border border-gray-600 rounded-lg p-4 gap-1'>
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