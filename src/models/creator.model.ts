import mongoose from "mongoose";

const socialSchema = new mongoose.Schema({
    youtube: {
        type: String,
        required: true
    },
    instagram: {
        type: String,
    }
})

const creatorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    tags: [String],
    socials: socialSchema
}, {timestamps: true});

export default mongoose.models.Creator || mongoose.model('Creator', creatorSchema);