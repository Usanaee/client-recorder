import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { User } from "./models/user.model.js";


const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // allow requests from this origin
    credentials: true, // allow sending cookies
  })
);

app.use(
  express.json({
    extended: true, // parse extended JSON payloads && TO Allow to add json data
    limit: "16kb",
  })
);

app.use(express.urlencoded({ extended: true, limit: "16kb" })); // parse application/x-www-form-urlencoded MEANS it reads data from url in encoded form
app.use(express.static("public"));
app.use(cookieParser());

// Router
import userRouter from "./routes/user.routes.js";
import adminRoute from "./routes/admin.routes.js";
app.use("/api/v1/users", userRouter);
app.use("/api/v1/admin", adminRoute);

app.get("/", (req, res) => {
  const user = await User.findOne({email : "saim@gmail.com"})

  res.send(
    
    `<h1>Welcome!${user}</h1>`
  
  );
});

export { app };
