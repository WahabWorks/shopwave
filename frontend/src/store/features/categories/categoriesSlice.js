import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoriesService from "./categoriesService.js";

//Use this function in categories page
export const AddCategory = createAsyncThunk(
  "categories/AddCategory",
  async (inputValues, thunkAPI) => {
    try {
      const response = await categoriesService.createCat(inputValues);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//Use this function in categories page
export const getAllCategory = createAsyncThunk(
  "categories/getAllCategory",
  async ( thunkAPI) => {
    try {
      const response = await categoriesService.getAllCat();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//Use this function in Update Categories
export const GetSingleCategory = createAsyncThunk(
  "categories/GetSingleCategory",
  async ( slug,thunkAPI) => {
    try {
      const response = await categoriesService.getSingleCat(slug);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//Use this function in Update
export const UpdatingCategory = createAsyncThunk(
  "categories/UpdatingCategory",
  async ({name , slug}, thunkAPI) => {
    try {
      const response = await categoriesService.updateCat({name , slug});
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//Use this function in categories page
export const DeleteCategory = createAsyncThunk(
  "categories/DeleteCategory",
  async (slug, thunkAPI) => {
    try {
      const response = await categoriesService.deleteCat(slug);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);



const initialState = {
  categories: [],
  status: "idle",
  error: null,
};
//Use this function in store file,(authReducer)
export const categoriesSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
  
  },
  extraReducers: (builder) => {
    builder
      .addCase(AddCategory.pending, (state) => {
        state.status = "loading";
        state.error= null ;
      })
      .addCase(AddCategory.fulfilled, (state, action) => {
        state.status = "success";
        state.categories = action.payload;
      })
      .addCase(AddCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getAllCategory.pending, (state) => {
        state.status = "loading";
        state.error= null ;
      })
      .addCase(getAllCategory.fulfilled, (state, action) => {
        state.status = "success";
        state.categories = action.payload;
      })
      .addCase(getAllCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(GetSingleCategory.pending, (state) => {
        state.status = "loading";
        state.error= null ;
      })
      .addCase(GetSingleCategory.fulfilled, (state, action) => {
        state.status = "success";
        state.categories = action.payload;
      })
      .addCase(GetSingleCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(UpdatingCategory.pending, (state) => {
        state.status = "loading";
        state.error= null ;
      })
      .addCase(UpdatingCategory.fulfilled, (state, action) => {
        state.status = "success";
        state.categories = action.payload;
      })
      .addCase(UpdatingCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(DeleteCategory.pending, (state) => {
        state.status = "loading";
        state.error= null ;
      })
      .addCase(DeleteCategory.fulfilled, (state, action) => {
        state.status = "success";
        state.categories = action.payload;
      })
      .addCase(DeleteCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
  },
});


export default categoriesSlice.reducer;
