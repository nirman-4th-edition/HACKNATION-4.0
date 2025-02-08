import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js';
import {User} from '../models/user.model.js';
import {uploadOnCloudinary} from '../utils/cloudinary.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import jwt, { decode } from 'jsonwebtoken';


const genrateAccessAndRefreshTokens =async(userId)=>{
    try{
        const user = await User.findById(userId);
        const accessToken= user.genrateAccessToken();
        const refreshToken= user.genrateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave:false});

        return {accessToken,refreshToken};
    }catch(error){
        throw new ApiError(500,"Something went wrong while genrating Access and Refresh tokens");
    }
}


const registerBusinessOrConsumer = asyncHandler(async (req, res) => {
    const { firstName, lastname, password, role, phoneno} = req.body;
  
    if ([firstName, lastname, password, role, phoneno].some((field) => field?.trim() === "")) {
      throw new ApiError(400, "Please fill in all fields");
    }

    if (!['Business', 'Consumer'].includes(role)) {
      throw new ApiError(400, "Invalid role specified");
    }
    const existedUser = await User.findOne({
      $or: [{ phoneno }, { password }]
    });
    if (existedUser) {
      throw new ApiError(409, "User with this email or username already exists");
    }
  
    const user = await User.create({
      firstName,
      // avatar: avatar.url,
      phoneno,
      lastname,
      password,
      role
    });

    const createdUser = await User.findById(user._id).select("-refreshToken");
  
    if (!createdUser) {
      throw new ApiError(500, "User creation failed");
    }
  
    return res.status(201).json(
      new ApiResponse(200, createdUser, "User registered successfully.")
    );
});

  
const registerDelivery = asyncHandler(async (req, res) => {
    const { fullName, email, username, password, bankName, accountNumber, ifscCode, accountHolderName } = req.body;
  
    if ([fullName, email, username, password].some((field) => field?.trim() === "")) {
      throw new ApiError(400, "Please fill in all fields");
    }
  
    const existedUser = await User.findOne({
      $or: [{ email }, { username }]
    });
    if (existedUser) {
      throw new ApiError(409, "User with this email or username already exists");
    }
   
    const user = await User.create({
      fullName,
      avatar: avatar.url,
      email,
      username: username.toLowerCase(),
      password,
      role: 'Delivery'
    });
  
    const bankDetails = await BankDetails.create({
      user: user._id,
      bankName,
      accountNumber,
      ifscCode,
      accountHolderName
    });
    user.bankDetails = bankDetails._id;
    await user.save();
  
    if (user) {
      await sendEmail(user.email, 'Welcome to Our Service', 'Thank you for registering!');
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName
      });
    } else {
      throw new ApiError(400, 'Invalid user data');
    }
  
    const createdUser = await User.findById(user._id).select("-password -refreshToken");
  
    if (!createdUser) {
      throw new ApiError(500, "User creation failed");
    }
  
    return res.status(201).json(
      new ApiResponse(200, createdUser, "User registered successfully.")
    );
});


const loginUser = asyncHandler(async(req,res) => {
    const {phoneno,password} = req.body;

    if(!phoneno && !password){
        throw new ApiError(400,"Please provide username or email");
    }

    const user = await User.findOne({
        $or: [{phoneno},{password}]
    })
    if(!user){
        throw new ApiError(404,"User not found");
    }

    const isPasswordVaild = await user.comparePassword(password);
    if(!isPasswordVaild){
        throw new ApiError(401,"Invalid credentials");
    }
    
    const {accessToken,refreshToken}= await genrateAccessAndRefreshTokens(user._id);

    const loggedInUser = User.findById(user._id).select("-refreshToken");

    const options={
        httpOnly:true,
        secure:true
    }

    return res.status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(200,{
            user:loggedInUser,
            accessToken,
            refreshToken
        },"User logged in successfully")
    )
});


const refreshAccessToken = asyncHandler(async(req,res) => {
   

    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request");
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET,        
        )
    
        const user =await User.findById(decodedToken?._id)
        if(!user){
            throw new ApiError(401,"Invalid token");
        }
    
        if(user.refreshToken !== incomingRefreshToken){
            throw new ApiError(401,"Refresh token is expired or used");
        }
    
        const options={
            httpOnly : true,
            secure : true,
        }
    
        const {accessToken,newRefreshToken} = await genrateAccessAndRefreshTokens(user._id);
    
        return res.status(200)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken",newRefreshToken,options)
        .json(
            new ApiResponse(200,{
                accessToken,
                refreshToken: newRefreshToken
            },"Access token refreshed successfully")
        )
    } catch (error) {
        throw new ApiError(401,error?.message || "Invalid refresh token");
    }
});


const changeCurrentPassword = asyncHandler(async(req,res) => {
    

    const {oldPassword,newPassword} = req.body; 

    
    const user = await User.findById(req.user?._id);
    const isPasswordCorrect = await user.comparePassword(oldPassword);

    if (!isPasswordCorrect) {
        throw new ApiError(400,"Invalid password");
    }

    user.password = newPassword;
    user.save({validateBeforeSave:false});

    return res.status(200)
    .json(
        new ApiResponse(200,{},"Password changed successfully")
    )
}); 


const updateAccountDetails = asyncHandler(async (req, res) => {
    const { firstName,lastname,  phoneno, role } = req.body;
  
    if (!firstName && !lastname && !phoneno && !role) {
      throw new ApiError(400, "Please provide fields to update");
    }
  
    if (role && !['Business', 'Consumer', 'Delivery'].includes(role)) {
      throw new ApiError(400, "Invalid role specified");
    }
  
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          fullName,
          email: email,
          role: role
        }
      },
      { new: true }
    ).select("-password");
  
    return res.status(200).json(
      new ApiResponse(200, user, "User details updated successfully")
    );
});


const businessOnboarding = asyncHandler(async (req, res) => {
    const { businessName, location, contactInfo } = req.body;

    if ([businessName, location, contactInfo].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "Please fill in all fields");
    }

    const user = await User.findById(req.user._id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    user.businessDetails = { businessName, location, contactInfo };
    await user.save();

    return res.status(200).json(
        new ApiResponse(200, user, "Business onboarding completed successfully.")
    );
});


const consumerOnboarding = asyncHandler(async (req, res) => {
    const { foodPreferences, geolocation } = req.body;

    if (!foodPreferences || !geolocation) {
        throw new ApiError(400, "Please provide food preferences and geolocation");
    }

    const user = await User.findById(req.user._id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    user.consumerDetails = { foodPreferences, geolocation };
    await user.save();

    return res.status(200).json(
        new ApiResponse(200, user, "Consumer onboarding completed successfully.")
    );
});


const sendNotification = asyncHandler(async (userId, message, type) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const notification = new Notification({
        userId,
        message,
        type
    });

    await notification.save();
});


const trackSustainabilityMetrics = asyncHandler(async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

   
    const metrics = {
        foodSaved: 100, 
        co2Reduced: 50  
    };

    user.sustainabilityMetrics = metrics;
    await user.save();

    return metrics;
});


const handleTransactionFees = asyncHandler(async (transaction) => {
    const feePercentage = 0.05; 
    const fee = transaction.amount * feePercentage;

    transaction.fee = fee;
    await transaction.save();

    return fee;
});


const handleSubscriptionPlans = asyncHandler(async (userId, plan) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    user.subscriptionPlan = plan;
    await user.save();

    return user;
});



export{
    registerBusinessOrConsumer,
    registerDelivery,
    loginUser,
    refreshAccessToken,
    changeCurrentPassword,
    updateAccountDetails,
    businessOnboarding,
    consumerOnboarding,
    sendNotification,
    trackSustainabilityMetrics,
    handleTransactionFees,
    handleSubscriptionPlans
}