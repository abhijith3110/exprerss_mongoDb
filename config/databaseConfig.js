import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.CONNECTION_DB);
        console.log(`MongoDB Connected: ${connection.connection.host}`);
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}