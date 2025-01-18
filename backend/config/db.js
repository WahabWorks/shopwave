import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
    try {
        const con = await mongoose.connect(`${process.env.MONGO_URL }`);
        console.log(`Connected to MongoDB - ${con.connection.host}`.bgGreen);
        
        
    } catch (error) {
        console.log(`MongoDB Connection Error - ${error}`);
        
    }
}

export default connectDB;