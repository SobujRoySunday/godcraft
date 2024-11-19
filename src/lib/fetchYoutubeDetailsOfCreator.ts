async function fetchYouTubeDetailsOfCreator(channelHandle: string): Promise<{
    profilePictureUrl: string;
    channelName: string;
    subscriberCount: number;
} | null> {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?forHandle=${channelHandle}&part=statistics,snippet&key=${process.env.YOUTUBE_DATA_API_KEY}`);

    if (!response) {
        return null;
    }

    const data = await response.json();
    const channelInfo = data.items[0];

    return {
        profilePictureUrl: channelInfo.snippet.thumbnails.high.url,
        channelName: channelInfo.snippet.title,
        subscriberCount: parseInt(channelInfo.statistics.subscriberCount, 10),
    };
}

export default fetchYouTubeDetailsOfCreator