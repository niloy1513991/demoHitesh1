import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/index.js";
const port = process.env.PORT;

dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    app.listen(port || 8000, () => {
      console.log("Server is running!");
    });
  })
  .catch((err) => {
    console.log("Mongodb connection failled!!! - ", err);
  });
