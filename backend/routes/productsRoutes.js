import express from "express";
import { isAdmin, isAuthorized } from "../middlewares/authMiddleware.js";
import { addProductsController, getAllProductController } from "../controllers/productsController.js";
import { upload } from "../middlewares/multerMiddleware.js";

const productsRouter = express.Router();

// http://localhost:8080/api/v1/products -Get
productsRouter.get(
  "/",
  getAllProductController
);

//Admin Routes
// http://localhost:8080/api/v1/products -POST
productsRouter.post(
  "/",
  upload.single("picture"),
  isAuthorized,
  isAdmin,
  addProductsController
);

// http://localhost:8080/api/v1/products/:slug -Delete

// http://localhost:8080/api/v1/products/:slug -GET

// http://localhost:8080/api/v1/products/:slug -Put

export default productsRouter;
