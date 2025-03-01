import dotenv from "dotenv";
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

dotenv.config({
    path: "./.env",
});

const port = process.env.PORT;

const connectDB = async () =>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    } catch (error) {
        console.log("MongoDB connection failled.",error);
        process.exit(1);
    }
}


export default connectDB;