import userModel from "../models/userModel.js";


const registerController =async(req,res)=>{
   const {name,email,password} = req.body;
 
try {
       
    if(!name || !email || !password){
        return res.status(400).send({success:false, message:"All Fields are Required"})
       }
    
       const newUser =await userModel.create({name,email,password});
    
       return res.status(201).send({success:true,message:"User Registration Successful",newUser});


} catch (error) {
 return res.status(400).send({
    success:false , message:"Error in registerController",error})
    
}
};
export {registerController};    
