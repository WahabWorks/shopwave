import { encryptPassword, matchPassword } from "../helper/userHelper.js";
import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'


const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        //Check Validation
        if (!name || !email || !password) {
            return res
                .status(400)
                .send({ success: false, message: "All Fields are Required" })
        }

        //Checking user  email already exist or not
        const userExist = await userModel.findOne({ email });
        if (userExist) {
            return res
                .status(400)
                .send({ success: false, message: "Email Already Exist" })
        }
        //Encrypting user password
        const hashedPassword = await encryptPassword(password);


        //User Created
        const newUser = await userModel.create({
            name,
            email,
            password: hashedPassword
        });


        return res
            .status(201)
            .send({
                success: true, message: "User Registration Successful"
            });
    } catch (error) {
        console.log(`registerController Error : ${error}`);
        return res.status(400).send({
            success: false, message: "Error in registerController", error
        })

    }

};

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        //Check Validation
        if (!email || !password) {
            return res
                .status(400)
                .send({ success: false, message: "All Fields are Required" });
        }
        //Check user email is present in database or not
        const user = await userModel.findOne({ email });
        if (!user) {
            return res
                .status(401)
                .send({ success: false, message: "Email not Registered" })
        }
        //Matching Password
        const isMatch = await matchPassword(password, user.password);
        if (!isMatch) {
            return res
                .status(401)
                .send({ success: false, message: "Invalid email password" })
        }
        //Generate Token
        const token = await  jwt.sign({id: user._id},process.env.JWT_SECRET,{
            expiresIn: process.env.JWT_EXP
        })


        //Remove password field to send user data from backend to frontend
        user.password=undefined;

        //Return Successful Response
        return res
                .cookie("token",token,{httpOnly: true,secure:true})  //"token"is key,token is genrated,{.} means managed by server
                .status(200)
                .send({ success: true, message: "Login Successful",user ,token  });

        
    } catch (error) {
        console.log(`loginController Error : ${error}`);
        return res
            .status(400)
            .send({
                success: false, 
                message: "Error in loginController", error
            });

    }
}

export { registerController, loginController };    
