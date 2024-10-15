import { asyncHandler } from "../utils/asyncHandler.js";
import { fileUploadOnCloudinary } from "../utils/fileUploadOnCloudinary.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { Admin } from "../models/admin.model.js";
import { isValidObjectId } from "mongoose";



const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await Admin.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new apiError(
      500,
      "Something went wrong while generating access and refresh token"
    );
  }
};

const adminRegister = asyncHandler(async (req, res) => {
  console.log("adminregister")
  const { name, email, password } = req.body;
  if (
    [name, email, password].some((field) => field?.trim() === "")
  ) {
    throw new apiError(400,"All fields are required");
  }

  const userExisted = await Admin.findOne({
    $or: [{ password }, { email }],
  });
  if (userExisted) {
    throw new apiError(409, "Email or Password already exists");
  }

  const avatarLocalPath = req.file?.path;
  if (!avatarLocalPath) {
    throw new apiError(400, "Avatar is required");
  }

  const avatar = await fileUploadOnCloudinary(avatarLocalPath);

  if (!avatar) {
    throw new apiError(400, "Avatar upload failed");
  }

  const user = await Admin.create({
    name,
    avatar: avatar.url,
    email,
    password,
  });
  const createdUser = await Admin.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new apiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new apiResponse(200, "User registered successfully", createdUser));
});

const adminlogin = asyncHandler(async (req, res) => {
  // Implementing login logic
  // check user eamil and password that user is already registered
  // generate access token and refresh token
  // return access token and refresh token
  const { email, name, password } = req.body;

  if (!(name || email)) {
    throw new apiError(400, "name and email is required");
  }

  const user = await Admin.findOne({
    $or: [{ name }, { email }],
  });

  if (!user) {
    throw new apiError(404, "User not existed");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new apiError(401, "Invalid password");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await Admin.findById(user._id).select(
    "-password -refreshToken"
  );

  const option = {
    httpOnly: false,
    secure: true,
  };

  return res
      .status(200)
      .cookie("accessToken", accessToken, option)
      .cookie("refreshToken", refreshToken, option)
    .json(
      new apiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );
});

const adminLogOut = asyncHandler(async (req, res) => {
  await Admin.findByIdAndUpdate(
    req.user._id,
    { refreshToken: undefined },
    { new: true }
  );

  const option = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", option)
    .clearCookie("refreshToken", option)
    .json(new apiResponse(200, {}, "User logged out successfully"));
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await Admin.findById(req.user?._id);
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new apiError(401, "Invalid old password");
  }
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new apiResponse(200, "Password changed successfully", {}));
});

const updateUserAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) {
    throw new apiError(400, "Avatar is required");
  }

  const avatar = await fileUploadOnCloudinary(avatarLocalPath);

  if (!avatar.url) {
    throw new apiError(400, "Error While uploading avatar to cloudinary");
  }

  const user = await Admin.findByIdAndUpdate(
    req.user?._id,
    { $set: { avatar: avatar.url } },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new apiResponse(200, user, "User Avatar updated successfully"));
});

const getSingleAdmin = asyncHandler(async (req, res) => {
  const adminId = req.user?._id;
  if (!isValidObjectId(adminId)) {
    throw new apiError("Invalid User ID", 400);
  }
  const user = await Admin.findById(adminId);
  if (!user) {
    throw new apiError("No User Found with this ID", 404);
  }
  return res
    .status(200)
    .json(new apiResponse(200, user, "User fetched successfully"));
});

export {
  adminlogin,
  adminLogOut,
  changeCurrentPassword,
  updateUserAvatar,
  adminRegister,
  getSingleAdmin
};









