import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

// note: if an argument isn't used then replace the args with "-" (Ex.- see the res of below function)
export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    //get the token
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "unauthorized request");
    }

    // verify it by jwt.verify, it returns the decoded payload
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    //find it in DB and store in a variable
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );
    //.id is provided in jwt.sign....

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    //adding new object to req
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access Token");
  }
});

//This line declares a variable named token. It attempts to retrieve the JWT token from the incoming request's cookies using optional chaining (?.). If accessToken is present in the cookies, it assigns its value to token. If not, it tries to extract the token from the request's Authorization header by removing the "Bearer " prefix if it exists.
