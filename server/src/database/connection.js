import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDatabase = async () => {
  try {
    const connected = await mongoose.connect(
      `${process.env.DB_URL}/${DB_NAME}`
    );
    console.log(
      `Database Connected Successfully! Database Host at ${connected.connection.host}`
    );
  } catch (error) {
    console.log("Error during connecting the database!", error);
    process.exit(1);
  }
};

export { connectDatabase };
