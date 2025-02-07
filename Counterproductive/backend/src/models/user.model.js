import mongoose , {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
  username: {
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true 
  },
  fullName:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:[true,"Password is required"]
  },
  avatar:{
    type:String 
  },
  role: {
    type: String,
    enum: ['Consumer', 'Business','Delivery'],
    required: true,
  },
  businessType: {
    type: String,
    enum: ['Restaurant', 'Grocery Store'],
    required: function() { return this.role === 'Business'; }
  },
  preferences: {
    foodTypes: [String],
    location: String,
  },
  address:[{
    type: Schema.Types.ObjectId,
    ref: "Address"
  }],
  paymentInfo:[{
    type: Schema.Types.ObjectId,
    ref: "Transaction"
  }],
  review:[{
    type: Schema.Types.ObjectId,
    ref: "Review"
  }],
  bankDetails: {
    type: Schema.Types.ObjectId,
    ref: "BankDetails"
  }
},{timestamps:true});


userSchema.pre("save", async function (next) {
  if(!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password,10)
  next()
})

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password,this.password)
}
userSchema.methods.generateAccessToken = function () {
  return jwt.sign({
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
  },
  process.env.ACCESS_TOKEN_SECRET,{
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
  }
)
}
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({
      _id: this._id
  },
  process.env.REFRESH_TOKEN_SECRET,{
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
  }
)
}




export const User = mongoose.model("User",userSchema);