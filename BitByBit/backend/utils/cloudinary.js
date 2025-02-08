import {v2 as cloudinary} from "cloudinary";
import { response } from "express";
import fs from "fs";

//* Switched to fs.promises.unlink for better asynchronous handling.

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) =>{
    try {
        if(!localFilePath) return null
        //upload file on cloudinary
        const result = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        } )
     //file has been uploaded successfully
        fs.unlinkSync(localFilePath);

        return result;

    } catch (error) {
        console.error('Error uploading file to Cloudinary:', error);
        return null;
        //removes the locally saved temp file as the upload operation got failed    
        
    }
}

const deleteOnCloudinary = async (public_id, resource_type="image") => {
    try {
        if (!public_id) return null;

        //delete file from cloudinary
        const result = await cloudinary.uploader.destroy(public_id, {
            resource_type: `${resource_type}`
        });
        console.log(result);
        return result;
    } catch (error) {
        console.error('Error deleting file from Cloudinary:', error);
        return null;
        //return error;
        // console.log("delete on cloudinary failed", error);
    }
};

export {uploadOnCloudinary, deleteOnCloudinary}