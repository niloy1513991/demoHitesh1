import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

const app = express();

app.use(cors());

// Setting the limit of how much json data can be received
app.use(express.json({limit: "16kb"}));

// This makes the url in an encoded form 
app.use(express.urlencoded({extended: true, limit: "16kb"}));

// Set the public folder to serve files (HTML, CSS, Images, JS)
app.use(express.static("public"));

app.use(cookieParser());

export { app };
