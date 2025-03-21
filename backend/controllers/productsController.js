import productsModel from "../models/productsModel.js";
import { uploadImageOnCloudinary } from "../helper/cloudinaryHelper.js";

const addProductsController = async (req, res) => {
  const { title, description, category, price } = req.body;
  const picture = req.file?.fieldname;
  const picturePath = req.file?.path;

  try {
    if (
      !title ||
      !description ||
      !category ||
      !price ||
      !picture ||
      !picturePath
    ) {
      return res
        .status(400)
        .send({ success: false, message: "All fields are required" });
    }

    // if (!req.user || !req.user._id) {
    //   return res.status(401).send({ success: false, message: "Unauthorized" });
    // }

    // uploading image  on cloudinary

    const { secure_url, public_id } = await uploadImageOnCloudinary(
      picturePath,
      "products"
    );
    if (!secure_url) {
      return res.status(400).send({
        success: false,
        message: "Failed to upload picture",
        error: secure_url,
      });
    }
    const addProduct = await productsModel.create({
      title,
      description,
      category,
      price,
      user: req.user._id,
      picture: {
        secure_url,
        public_id,
      },
    });
    res.status(201).send({
      success: true,
      message: "Product uploaded successfully",
      addProduct,
    });
  } catch (error) {
    console.log(`Error in addProductController ${error}`);
    res.status(401).send({
      success: false,
      message: `Error in addProductController: ${error}`,
    });
  }
};

const getAllProductController = async (req, res) => {

  try {
  
    const products = await productsModel.find({}).populate("user","name").populate("category","name");

    res.status(200).send({
      success: true,
      totat: products.length,
      message: "All Product fetched successfully",
      products,
    });
  } catch (error) {
    console.log(`Error in getAllProductController ${error}`);
    res.status(401).send({
      success: false,
      message: `Error in getAllProductController: ${error}`,
      error
    });
  }
};


export { addProductsController,getAllProductController };
