import Users from "../Models/Users.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
export const signup = async (req,res)=>{
    try {
        const {name,email,password} = req.body;
        const user = await Users.findOne({email});
        if(user){
            return res.status(409).json({message:"User Already exist",success:false})
        }
        const usermodel = new Users({name,email,password})
        usermodel.password = await bcrypt.hash(password,10);
        await usermodel.save();
        return res.status(201).json({
            message:"Signup successfully",
            success:true
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"Internal Server error",
            success:false
        })
    }
}

export const login = async (req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await Users.findOne({email});
        const errorMsg = "Auth Failed..User password or username wrong"
        if(!user){
            return res.status(403).json({message:errorMsg,success:false})
        }
       const isPassEqual = await bcrypt.compare(password,user.password);
       if(!isPassEqual){
        return res.status(403).json({message:errorMsg,success:false})
       }
       const jwttoken = jwt.sign({email:user.email,_id:user._id},process.env.JWT_SECRET,{expiresIn:"24h"})
        return res.status(200).json({
            message:"Login successfully",
            success:true,
            jwttoken,
            name:user.name
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"Internal Server error",
            success:false
        })
    }
}