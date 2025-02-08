import mongoose,{Schema} from "mongoose";

const addressSchema = new Schema({
    fullName:{
        type: String,
        required: true
    },
    streetAddress:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    zipcode:{
        type: Number,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    mobile:{
        type:String,
        required: true
    },
    email:{
        type: String,
        required: true 
    }
});


export const Address = mongoose.model("Address",addressSchema);