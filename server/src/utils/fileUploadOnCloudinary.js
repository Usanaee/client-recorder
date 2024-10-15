import { v2 as cloudinary } from "cloudinary";
import { Readable } from 'stream'; // Import Readable from stream
import dotenv from "dotenv";

dotenv.config({ path: "./.env" }); // Load environment variables from .env file

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

    // Create a readable stream from the file buffer
    const readableStream = Readable.from(fileBuffer);

    // Upload the file to Cloudinary using the stream
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: "auto" },
        (error, result) => {
          if (error) {
            console.error("Error uploading file to Cloudinary:", error);
            reject(null);
          } else {
            resolve(result);
          }
        }
      );
      
      // Pipe the readable stream to Cloudinary's upload stream
      readableStream.pipe(stream);
    });

  } catch (error) {
    console.log("Error uploading file to Cloudinary:", error);
    return null;
  }
};

export { fileUploadOnCloudinary };
