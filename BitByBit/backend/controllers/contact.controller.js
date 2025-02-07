import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {Contact} from '../models/contact.model.js';

const handleContactForm = asyncHandler(async (req, res) => {
    const { name, email, message } = req.body;
    if ([name, email].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const newContact = await Contact.create({
        name: name,
        email: email,
        message: message
    })

    if(!newContact){
        throw new ApiError(500, "Error creating contact")
    }

    return res.status(201).json(
        new ApiResponse (201, "Contact from submitted successfully", newContact)
    )
    
});

export {handleContactForm}