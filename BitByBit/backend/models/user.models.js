import mongoose,{Schema} from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"

const userSchema = new Schema({
    username:{
        type:String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,//for searching
    },
    email:{
        type:String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullName:{
        type:String,
        required: true,
        trim: true,
        index: true,//for searching
    },
    avatar:{
        type:String,
        required: true,
    },
    password: {
        type:String,
        required: [true, 'password is required'],
    },
    refreshToken: {
        type: String,
    },
    ethAddress: {
        type: String,
        unique: true,  // Each user should have a unique Ethereum address  // Allows some users to have no Ethereum address
        trim: true,
        match: /^0x[a-fA-F0-9]{40}$/, // Validates Ethereum address format
    },
    creditScore: {
        type: Number,
        required: false,
        default: 700
    }
    // aadhaarDetails: {
    //     aadhaarNumber: {
    //         type: String,
    //         unique: true,
    //         match: /^\d{12}$/, // Match 12-digit Aadhaar number
    //         sparse: true, // Makes this field optional at first
    //     },
    //     fullNameAsPerAadhaar: {
    //         type: String,
    //         trim: true,
    //     },
    //     gender: {
    //         type: String,
    //         enum: ['Male', 'Female', 'Other'],
    //     },
    //     dob: {
    //         type: Date,
    //     },
    //     mobileNumber: {
    //         type: String,
    //         match: /^[0-9]{10}$/, // Match 10-digit mobile number
    //     },
    //     address: {
    //         street: {
    //             type: String,
    //             required: true,
    //             trim: true,
    //         },
    //         city: {
    //             type: String,
    //             required: true,
    //             trim: true,
    //         },
    //         state: {
    //             type: String,
    //             required: true,
    //             trim: true,
    //         },
    //         postalCode: {
    //             type: String,
    //             required: true,
    //             match: /^[0-9]{6}$/, // Match 6-digit postal code
    //         },
    //         country: {
    //             type: String,
    //             required: true,
    //             trim: true,
    //         },
    //     },
    // },
    // isVerified: {
    //     type: Boolean,
    //     default: false
    // }
    

}, {timestamps: true})

userSchema.pre("save" , async function(next){
    if(!this.isModified("password")){
        return next()
    }
    this.password = await bcrypt.hash(this.password , 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
   return await bcrypt.compare(password,this.password)  
}

userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName,
            ethAddress: this.ethAddress,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model("User" , userSchema)