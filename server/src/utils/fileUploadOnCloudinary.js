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
const fileUploadOnCloudinary = async (fileBuffer) => {
  try {
    if (!fileBuffer) return null;

    const uploadResult = await cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      (error, result) => {
        if (error) {
          console.error("Error uploading file to Cloudinary:", error);
          return null;
        }
        return result;
      }
    );

    // Create a readable stream from buffer and pipe it to Cloudinary
    const readableStream = require('stream').Readable.from(fileBuffer);
    readableStream.pipe(uploadResult);
  } catch (error) {
    console.log("Error uploading file to Cloudinary:", error);
    return null;
  }
};


export { fileUploadOnCloudinary };
