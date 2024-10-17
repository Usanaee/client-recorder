import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { fileUploadOnCloudinary } from "../utils/fileUploadOnCloudinary.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { isValidObjectId } from "mongoose";

const addUser = asyncHandler(async (req, res) => {
  const { name, email, password, businessType, status } = req.body;
  if (
    [name, email, password, businessType, status].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new apiError(
      "Name,Email,Password,businessType fields are required",
      400
    );
  }
  
  // Access the uploaded file buffer
  const avatarBuffer = req.file?.buffer;
  if (!avatarBuffer) {
    throw new apiError(400, "Avatar is required");
  }

  const avatarUploadOnCloudinary = await fileUploadOnCloudinary(avatarBuffer); // Upload buffer to Cloudinary
  
  const user = await User.create({
    name,
    email,
    businessType,
    status,
    avatar: avatarUploadOnCloudinary ? avatarUploadOnCloudinary.url : "",
    admin: req.user,
  });
  if (!user) {
    throw new apiError("Failed to create user", 500);
  }
  return res
    .status(200)
    .json(new apiResponse(200, user, "User Add To database"));
});
const getAllUser = asyncHandler(async (req, res) => {
  const loggedInAdminId = req.user._id; 


  const users = await User.aggregate([
    {
      $match: { admin: loggedInAdminId }, 
    },
    {
      $lookup: {
        from: "admins",
        localField: "admin",
        foreignField: "_id",
        as: "adminDetails", 
      },
    },
    {
      $unwind: "$adminDetails", // Unwind the admin array to get the first (and only) result
    },
  ]);

  if (users.length === 0) {
    return res
      .status(404)
      .json(new apiResponse(404, [], "No User Exist in database"));
  }

  return res
    .status(200)
    .json(new apiResponse(200, users, "All Users From database"));
});

const showUser = asyncHandler(async (req,res)=>{
  const user  = User.findOne({"email" : "saim@gmail.com"});
  return user;
})
const updateUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { name, email, businessType, status } = req.body;
  if (
    [name, email, businessType, status].some((field) => field?.trim() === "")
  ) {
    throw new apiError(
      "Name, Email, Password, businessType fields are required",
      400
    );
  }
  const userUpdated = await User.findByIdAndUpdate(
    userId,
    {
      name,
      email,
      businessType,
      status,
    },
    { new: true }
  );
  if (!userUpdated) {
    throw new apiError(500, "Failed to update user");
  }
  return res
    .status(200)
    .json(new apiResponse(200, userUpdated, "User Update In Successfully!"));
});
const deleteUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  if (!isValidObjectId(userId)) {
    throw new apiError("Invalid User ID", 400);
  }
  const user = await User.findByIdAndDelete(userId);
  if (!user) {
    throw new apiError("Failed to delete user", 500);
  }
  return res
    .status(200)
    .json(new apiResponse(200, user, "User Delete From database"));
});
const getSingleUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  if (!isValidObjectId(userId)) {
    throw new apiError("Invalid User ID", 400);
  }
  const user = await User.findById(userId);
  if (!user) {
    throw new apiError("No User Found with this ID", 404);
  }
  return res
    .status(200)
    .json(new apiResponse(200, user, "User fetched successfully"));
});

export { addUser, getSingleUser, updateUser, deleteUser, getAllUser };
