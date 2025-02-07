import mongoose , {Schema} from "mongoose";

const categorySchema = new Schema({
    name:{
        type:String,
        required: true,
        maxlength: 50
    },
    parentCategory:{
        type:Schema.Types.ObjectId,
        ref: "Category",
        default:null
    },
    level:{
        type:Number,
        required: true
    }
});


export const Category = mongoose.model("Category",categorySchema);