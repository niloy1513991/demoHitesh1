import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCoudinary } from "../utils/cloudinary.js";

// Algorithm > 
  // Get user info from the frontend
  // Validation + not empty
  // Check if user / email already exists
  // Check for images and avatar
  // If all okay then upload to cloudinary
  // Create a user object - create entry in mongoDB
  // Remove pass and refresh token feild from response
  // Check if user is created > returs response OK or error

const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, fullName, password } = req.body;
  console.log(email);
  if (
    [fullName, email, userName, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required.");
  }

  const existingUser = User.findOne({ $or: [email, userName] });

  if (existingUser) throw new ApiError(409, "User already exists!");

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) throw new ApiError(400, "Avatar is required");

  const avatar = await uploadOnCoudinary(avatarLocalPath);
  const coverImage = await uploadOnCoudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar is required!");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    userName: userName.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if(!createdUser) {
    throw new ApiError(500, "Something went wrong while registering a new user.");
  }

  return res.status(201).json(new Apiresponse(200, createdUser, "User created successfully"))
});

export { registerUser };
