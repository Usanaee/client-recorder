import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { adminlogin, adminLogOut, adminRegister,changeCurrentPassword,getSingleAdmin,updateUserAvatar } from "../controllers/admin.controller.js";

const adminRoute = Router();

adminRoute.route("/register-admin").post(upload.single("avatar"), adminRegister);

adminRoute.route("/login-admin").get(upload.none(), adminlogin);
adminRoute.route("/get-single-admin").get(verifyJWT,getSingleAdmin);

//Secured routes
adminRoute.route("/logout-admin").post(verifyJWT, adminLogOut);
adminRoute
  .route("/change-password")
  .post(verifyJWT, upload.none(), changeCurrentPassword);
adminRoute
  .route("/update-avatar")
  .post(verifyJWT, upload.single("avatar"), updateUserAvatar);


export default adminRoute;