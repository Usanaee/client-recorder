import dotenv from "dotenv";
import { app } from "./app.js";
import { connectDatabase } from "./database/connection.js";

dotenv.config({
  path: "./.env",
});

connectDatabase()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log("Server is running on port ", process.env.PORT);
    });
    app.on("error", () => {
      console.error("App Not Connected To Database!", error);
      throw error;
    });
  })
  .catch((error) => {
    console.log("Failed to connect to the database.", error);
  });
