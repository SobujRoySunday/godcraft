import mongoose from "mongoose";

const contributorSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    tags: [String],
    message: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
    }
}, {timestamps: true})

export default mongoose.models.Contributor || mongoose.model('Contributor', contributorSchema)