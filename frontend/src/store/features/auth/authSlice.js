import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService.js'

const initialState = {
    user: null,
    status: "idle",
    error: null
}
//Use this function in login page
//login is function that will be called (frontend)when user clicks login button,also run createAsyncThunk behind the scene
export const login = createAsyncThunk("auth/login", async (inputValues, thunkAPI)=>{    
    try {
        return await authService.loginUser(inputValues);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})
//Use this function in store file,(authReducer)
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    incrementByAmount: (state, action) => {
        state.value += action.payload
      },
  },
  extraReducers: (builder)=>{
    builder.addCase(login.pending, (state)=>{
        state.status = "loading"
    }).addCase(login.fulfilled,(state,action)=>{
      state.status = "success"
      state.user = action.payload;
    }).addCase(login.rejected,(state,action)=>{
      state.status = "failed"
      state.error = action.payload;
    }
  )
  }
})

// Action creators are generated for each case reducer function
export const { incrementByAmount } = authSlice.actions

export default authSlice.reducer;