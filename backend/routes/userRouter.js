import express from "express";
import { registerController } from "../controllers/userController.js";

const router = express.Router();

// http://localhost:8080//api/v1/users/register
router.post("/register",registerController);

export default router; 