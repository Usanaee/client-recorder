import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" }); // Load environment variables from.env file

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload an image
const fileUploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // Upload the file on the cloudinary
    const uploadResult = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    fs.unlinkSync(localFilePath); // Delete the local temporary saved file as file uploaed failed
    return uploadResult;
  } catch (error) {
    fs.unlinkSync(localFilePath); // Delete the local temporary saved file as file uploaed failed
    console.log("Error uploading file to Cloudinary:", error);
    return null;
  }
};

export { fileUploadOnCloudinary };
