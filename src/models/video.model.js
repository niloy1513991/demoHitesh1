import { Schema, model } from "mongoose";
const videoSchema = new Schema({
    videoFile:{
        type: String, //Coudinary services
        required: true,
    },
    thumbnail:{
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true,
    },
    dscription:{
        type: String,
        required: true,
    },
    duration:{
        type: Number,   //Coudinary services
        required: true,
    },
    views:{
        type: Number,
        default: 0,
    },
    isPublished:{
        type: Boolean,   //Coudinary services
        default: true,
    },
    owner:{
        type: Schema.Types.ObjectId,   //Coudinary services
        ref: "User",
    },
}, { timestamps: true });
export const Video = model("Video", videoSchema);
