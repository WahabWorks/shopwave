import { encryptPassword } from "../helper/userHelper.js";
import userModel from "../models/userModel.js";


const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;

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
        password:hashedPassword });


    return res
        .status(201)
        .send({ success: true, message: "User Registration Successful", newUser });
} catch (error) {
    console.log(`registerController Error : ${error}`);
    return res.status(400).send({
        success: false, message: "Error in registerController", error
    })

}
 
};
export { registerController };    
