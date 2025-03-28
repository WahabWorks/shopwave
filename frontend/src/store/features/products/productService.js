import axios from "axios";

//Use this function in productsSlice.js => createAsyncThunk
//Register
const createProduct = async (inputValues) => {
    try {
      const axiosResponse = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/products`,
        inputValues,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return axiosResponse.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong! Please try again";
      return Promise.reject(errorMessage);
    }
  };
// Getting all Products
const getAllProd = async () => {
  try {
    const axiosResponse = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/products`,      
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return axiosResponse.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong! Please try again";
    return Promise.reject(errorMessage);
  }
};
//Delete product Code
const deleteProd = async (productId) => {
  try {
    const axiosResponse = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/products/${productId }`,
      
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return axiosResponse.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong! Please try again";
    return Promise.reject(errorMessage);
  }
};

const productService = { createProduct,getAllProd,deleteProd };

export default productService;
