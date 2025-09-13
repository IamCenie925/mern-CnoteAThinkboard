import mongoose from "mongoose";

export const connectDB = async () => { 
    try {
        await mongoose.connect(
            process.env.MONGO_URI //secret environment variable, noone can see our config
        ); 

        console.log("MONGODB CONNECTED SUCCESSFULLY!");

    } catch (error) {
        console.error("Error connecting to MongoDN", error);
        process.exit(1); //exit with failure     
    }
};