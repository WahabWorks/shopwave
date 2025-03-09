import express from "express";
import { allUsersController, loginController, logoutController, registerController } from "../controllers/userController.js";
import { isAdmin, isAuthorized } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

// http://localhost:8080//api/v1/users/register
userRouter.post("/register",registerController);
// http://localhost:8080//api/v1/users/login
userRouter.post("/login",loginController);
// http://localhost:8080//api/v1/users/logout
userRouter.get("/logout",logoutController);

//Admin Routes
// http://localhost:8080//api/v1/users/all-users
userRouter.get("/all-users",isAuthorized,isAdmin,allUsersController);


export default userRouter; 

