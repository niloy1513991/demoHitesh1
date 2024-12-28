import dotenv from "dotenv";
import connectDB from "./db/index.js";
// Load environment variables from the .env file in the project's root
dotenv.config({
    path: "./env",
});

const port = process.env.PORT;

connectDB();