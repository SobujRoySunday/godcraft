import React from 'react'
import Container from './Container'
import Image from 'next/image'
import Link from 'next/link'
import connectDB from '@/lib/db';
import Creator from "@/models/creator.model";

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

async function extractChannelId(url: string): Promise<string> {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');
    const username = pathParts.includes("user") ? pathParts[pathParts.indexOf("user") + 1] : pathParts[1].substring(1);
    return username;
}

async function fetchYouTubeDetailsOfCreator(channelHandle: string): Promise<{
    profilePictureUrl: string;
    channelName: string;
    subscriberCount: number;
} | null> {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?forHandle=${channelHandle}&part=statistics,snippet&key=${process.env.YOUTUBE_DATA_API_KEY}`);

    if (!response) {
        throw new Error('Failed to fetch followers of creator');
    }

    const data = await response.json();
    const channelInfo = data.items[0];

    return {
        profilePictureUrl: channelInfo.snippet.thumbnails.high.url,
        channelName: channelInfo.snippet.title,
        subscriberCount: parseInt(channelInfo.statistics.subscriberCount, 10),
    };
}


async function fetchCreators(): Promise<Creator[] | null> {
    return connectDB().then(async () => {
        const creatorsData = await Creator.find();

        if (creatorsData.length === 0)
            return null;

        for (let i = 0; i < creatorsData.length; i++) {
            const youtubeAPIData = await fetchYouTubeDetailsOfCreator(await extractChannelId(creatorsData[i].socials.youtube) as string);

            creatorsData[i].followers = youtubeAPIData?.subscriberCount;
            creatorsData[i].image = youtubeAPIData?.profilePictureUrl;
            creatorsData[i].name = youtubeAPIData?.channelName;

            creatorsData[i].save();
        }

        return creatorsData;
    }).catch((error) => {
        console.error(error);
        return null;
    })


}

const TopCreators = async () => {
    const creators = await fetchCreators();

    return (
        <Container>
            {creators && (
                <>
                    <h2>Our Top Creators</h2>
                    <div className='flex flex-wrap gap-8 p-4 justify-center'>
                        {creators.map((creator) => (
                            <div key={creator.name} className='w-[250px] flex flex-col items-center border border-gray-600 rounded-lg p-4 gap-1'>
                                <Image src={creator.image} alt={creator.name} width={160} height={160} className='w-40 h-40 object-cover rounded-full' />
                                <h3 className='text-xl font-semibold'>{creator.name}</h3>
                                <p className='text-gray-400 text-sm'>{creator.tags.join(' | ')}</p>
                                <p className='text-gray-400 text-sm'>Followers: <span className='text-white border-2 border-gray-600 rounded-full px-2'>{creator.followers}</span></p>
                                <div className='flex gap-2 items-center justify-center'>
                                    <Link href={creator.socials.youtube} target='_blank' rel='noopener noreferrer'>
                                        <Image src="/assets/youtube.png" alt="YouTube" width={24} height={24} className='h-6 object-contain' />
                                    </Link>
                                    {creator.socials.instagram && (
                                        <Link href={creator.socials.instagram} target='_blank' rel='noopener noreferrer'>
                                            <Image src="/assets/instagram.webp" alt="Instagram" width={24} height={24} className='h-6 object-contain' />
                                        </Link>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </Container>
    )
}

export default TopCreators