import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        if (mongoose.connection.readyState >= 1) {
            return;
        }
        return mongoose.connect(process.env.MONGODB_URI!);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

export default connectDB;
