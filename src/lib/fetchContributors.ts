import contributorModel from "@/models/contributor.model";
import { connectDB } from ".";

const fetchContributors = async () => {
    return connectDB().then(async () => {
        const contributors = await contributorModel.find();
        if (contributors.length === 0)
            return null;
        return contributors;
    }).catch((error) => {
        console.error(error);
        return null;
    })
}

export default fetchContributors