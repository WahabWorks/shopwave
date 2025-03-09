import categoriesModel from "../models/categoriesModel.js";
import slugify from "slugify";

const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    //Check Validation
    if (!name) {
      return res
        .status(400)
        .send({ success: false, message: "Category name are Required" });
    }

    //Checking category already exist or not
    const isExist = await categoriesModel.findOne({ name });
    if (isExist) {
      return res
        .status(400)
        .send({ success: false, message: "Category Already Exist" });
    }
    //Category Created
    const Category = await categoriesModel.create({
      name, //Samsung Mobile
      slug: slugify(name, { lower: true, strict: true }), //samsung-mobile
    });

    return res.status(201).send({
      success: true,
      message: "Category Created Successfully",
      Category,
    });
  } catch (error) {
    console.log(`createCategoryController Error : ${error}`);
    return res.status(400).send({
      success: false,
      message: "Error in createCategoryController",
      error,
    });
  }
};
const getAllCategoryController = async (req, res) => {
  try {
    // Fetching all categories from database
    const categories = await categoriesModel.find({});

    return res.status(201).send({
      success: true,
      message: "Category Fetched Successfully",
      categories,
    });
  } catch (error) {
    console.log(`getAllCategoryController Error : ${error}`);
    return res.status(400).send({
      success: false,
      message: "Error in getAllCategoryController",
      error,
    });
  }
};
const deleteCategoryController = async (req, res) => {
  try {
    const { slug } = req.params;

    const category = await categoriesModel.findOneAndDelete({ slug });
    if (!category) {
      return res
        .status(404)
        .send({ success: false, message: "Category Not Found" });
    }

    return res.status(200).send({
      success: true,
      message: "Category Deleted Successfully",
    });
  } catch (error) {
    console.log(`deleteCategoryController Error : ${error}`);
    return res.status(400).send({
      success: false,
      message: "Error in deleteCategoryController",
      error,
    });
  }
};
const getSingleCategoryController = async (req, res) => {
  try {
    const { slug } = req.params;

    const category = await categoriesModel.findOne({ slug });
    if (!category) {
      return res
        .status(404)
        .send({ success: false, message: "Category Not Found" });
    }

    return res.status(200).send({
      success: true,
      message: "Category Fetched Successfully",
      category,
    });
  } catch (error) {
    console.log(`getSingleCategoryController Error : ${error}`);
    return res.status(400).send({
      success: false,
      message: "Error in getSingleCategoryController",
      error,
    });
  }
};
const updateCategoryController = async (req, res) => {
  try {
    const { slug } = req.params;
    const { name } = req.body;

    //Check Validation
    if (!name) {
      return res
        .status(400)
        .send({ success: false, message: "Category name are Required" });
    }

    const category = await categoriesModel.findOneAndUpdate({ slug },
      {name,slug:slugify(name,{lower:true,strict:true})},
      {new :true}
    );
    if (!category) {
      return res
        .status(404)
        .send({ success: false, message: "Category Not Found" });
    }

    return res.status(200).send({
      success: true,
      message: "Category Updated Successfully",
    });
  } catch (error) {
    console.log(`updateCategoryController Error : ${error}`);
    return res.status(400).send({
      success: false,
      message: "Error in updateCategoryController",
      error,
    });
  }
};

export {
  createCategoryController,
  getAllCategoryController,
  deleteCategoryController,
  getSingleCategoryController,
  updateCategoryController,
};
