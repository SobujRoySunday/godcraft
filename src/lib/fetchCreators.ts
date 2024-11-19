import { connectDB, Creator, extractChannelId, fetchYouTubeDetailsOfCreator } from ".";
import creatorModel from "@/models/creator.model";

async function fetchCreators(): Promise<Creator[] | null> {
    return connectDB().then(async () => {
        const creatorsData = await creatorModel.find();

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

export default fetchCreators