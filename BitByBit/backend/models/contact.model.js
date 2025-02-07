import mongoose, {Schema} from "mongoose";

const contactSchema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true,

    },
    email: {
        type: String,
        required: true,
        trim: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    message: {
        type: String,
        required: false,
        trim: true,
    }
}, {timestamps: true})

export const Contact = mongoose.model("Contact", contactSchema)
