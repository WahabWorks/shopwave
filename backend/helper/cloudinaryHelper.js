import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

 // Configuration
 cloudinary.config({ 
    cloud_name: 'duqohebr5', 
    api_key: '441836578613744', 
    api_secret: 'GrptpIr-ifSwgE52375_xeoQJHA' // Click 'View API Keys' above to copy your API secret
});

// ----------------------------------------------------------------------for uploading image on cloudinary
const uploadImageOnCloudinary=async(filepath,foldername)=>{
    // for uploading image on cloudinary
    try {
        const result =await cloudinary.uploader.upload(filepath,{

            folder: foldername,
        });
         // for deleating image from server
        try {
            fs.unlinkSync(filepath);
        } catch (error) {
            console.log(`Failed to delete image from server: ${error}`)
            
        }
       console.log(result);
        return {
           secure_url : result.secure_url,
           public_id  : result.public_id,
        } ;    

    } catch (error) {
        throw new Error(error.message || 'Cloudinary upload failed');
        
    }
}
// ----------------------------------------------------------------------for deleting image on cloudinary

const deleteImageOnCloudinary=async(public_id)=>{
   
    try {
        const result =await cloudinary.uploader.destroy(public_id);
        return result;
        
    } catch (error) {
        throw new error(error);
        // throw new Error(error.message || 'Cloudinary upload failed');
        
    }
}
export{uploadImageOnCloudinary,deleteImageOnCloudinary}