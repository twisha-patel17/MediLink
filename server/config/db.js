import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected Successfully.");
    } catch (error) {
        console.log("MongoDB Connection Failed.",
            error.message
        );
        process.exit(1);
    }
}