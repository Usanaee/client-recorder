import { Router } from "express";
import {
  addUser,
  deleteUser,
  getAllUser,
  getSingleUser,
  updateUser,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.route("/add-user").post(verifyJWT,upload.single("avatar"), addUser);
userRouter.route("/get-all-user").get(verifyJWT,getAllUser);
userRouter
  .route("/user/:userId")
  .patch(upload.none(), updateUser)
  .delete(deleteUser)
  .get(getSingleUser);

//Secured routes


export default userRouter;
