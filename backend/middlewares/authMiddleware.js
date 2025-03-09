import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const isAuthorized = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please login to access this resource",
      });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findById(decodedToken.id);
    next();
  } catch (error) {
    console.log(`isAuthorized middleware Error : ${error}`);
    return res.status(400).send({
      success: false,
      message: "Error in isAuthorized middleware",
      error,
    });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = req.user;
   
    if (!user || user.role !== 1){
      return res.status(401).send({
        success: false,
        message: "You are not authorized to access this resourse",
      });
    }
    next();
  } catch (error) {
    console.log(`isAdmin middleware Error : ${error}`);
    return res.status(400).send({
      success: false,
      message: "Error in isAdmin middleware",
      error,
    });
  }
};

export { isAuthorized, isAdmin };
