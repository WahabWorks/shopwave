import express from "express";
import colors from "colors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import cookieParser from 'cookie-parser';

dotenv.config();
//MongoDB Connection
connectDB();


const app = express();

//Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors({origin:"http://localhost:5173",credentials:true }));
app.use(cookieParser());

//Importing Routes
import userRoutes from "./routes/userRoutes.js";
import categoriesRoutes from "./routes/categoriesRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";


app.use("/api/v1/users",userRoutes)
app.use("/api/v1/categories",categoriesRoutes)
app.use("/api/v1/products",productsRoutes)


const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{console.log(`Server is Running at Port ${PORT}`.bgBlue)});