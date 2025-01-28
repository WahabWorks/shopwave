import axios from 'axios';

//Use this function in authSlice.js => createAsyncThunk
const loginUser = async(inputValues)=>{
    const axiosResponse = axios
    .post(`${import.meta.env.VITE_BASE_URL}/users/login`,
      inputValues,
        {
          withCredentials:true , 
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then((response)=>{
            return response.data;
        })
        .catch((error)=>{
            return error.response.data;
        })
        return axiosResponse;
}
const authService ={loginUser}

export default authService;