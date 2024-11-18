import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

export default async function connectDB(): Promise<void> {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI as string);
        console.log(`MongoDB connected : ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error while connecting to DB : ${error}`);
        process.exit(1);
    }
}
