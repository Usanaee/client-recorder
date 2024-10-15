import multer from "multer";

const storage = multer.memoryStorage(); // Store files in memory as buffer

export const upload = multer({
  storage, // Use memoryStorage instead of diskStorage
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10 MB
});
