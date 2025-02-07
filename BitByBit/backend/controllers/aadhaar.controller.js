import axios from 'axios';
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.models.js";

// Controller to request and verify Aadhaar OTP in one flow

const aadhaarVerification = asyncHandler(async (req, res) => {
    const { aadhaarNumber, otp } = req.body;

    // Validate Aadhaar number format
    if (!aadhaarNumber || !aadhaarNumber.match(/^\d{12}$/)) {
        throw new ApiError(400, "Invalid Aadhaar number format");
    }

    // Case 1: If OTP is not provided, request OTP
    if (!otp) {
        // Request OTP from third-party provider
        try {
            const otpResponse = await axios.post('https://thirdpartyprovider.com/aadhaar/otp', {
                aadhaarNumber: aadhaarNumber,
            });

            if (otpResponse.data.success) {
                return res.status(200).json({
                    message: "OTP sent successfully. Please check your mobile number."
                });
            } else {
                throw new ApiError(500, "Failed to send OTP");
            }
        } catch (error) {
            throw new ApiError(500, error.message || "Error requesting OTP");
        }
    }

    // Case 2: If OTP is provided, verify OTP
    if (otp) {
        try {
            // Verify OTP with third-party provider
            const verifyResponse = await axios.post('https://thirdpartyprovider.com/aadhaar/verify', {
                aadhaarNumber: aadhaarNumber,
                otp: otp,
            });

            if (verifyResponse.data.success) {
                // OTP successfully verified, mark Aadhaar details as verified
                const user = await User.findOne({ "aadhaarDetails.aadhaarNumber": aadhaarNumber });

                if (user) {
                    user.aadhaarDetails.isVerified = true;
                    await user.save();
                    return res.status(200).json({ message: "Aadhaar verification successful" });
                } else {
                    throw new ApiError(404, "User not found with this Aadhaar number");
                }
            } else {
                throw new ApiError(400, "Invalid OTP or Aadhaar number");
            }
        } catch (error) {
            throw new ApiError(500, error.message || "Error verifying OTP");
        }
    }
});





export { aadhaarVerification };

