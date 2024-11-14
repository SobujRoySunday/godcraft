import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    password: {
        type: String,
    }
}, {timestamps: true});

export default mongoose.models.User || mongoose.model('User', userSchema);