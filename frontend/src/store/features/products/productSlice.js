import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService.js";

//Use this function in products page to add product
export const addProduct = createAsyncThunk(
  "products/AddProduct",
  async (inputValues, thunkAPI) => {
    try {
      const response = await productService.createProduct(inputValues);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//Use this function to get all products 
export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async ( thunkAPI) => {
    try {
      const response = await productService.getAllProd();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


const initialState = {
  products: [],
  status: "idle",
  error: null,
};

//Use this function in store file,(authReducer)
export const productSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.status = "loading";
        state.error= null ;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.status = "success";
        state.products = action.payload;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getAllProducts.pending, (state) => {
        state.status = "loading";
        state.error= null ;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
  },
});


export default productSlice.reducer;
