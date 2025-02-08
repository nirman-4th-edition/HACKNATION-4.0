import pkg from "joi";
const Joi = pkg;
export const signupvalidation = (req,res,next)=>{
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(5).max(100).required()
    })
   const {error} = schema.validate(req.body)
   if(error){
    return res.status(400).json({message:"BAD REQUEST",error});
   }
next()
}

export const loginvalidation = (req,res,next)=>{
    const schema = Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().min(5).max(100).required()
    })
   const {error} = schema.validate(req.body)
   if(error){
    return res.status(400).json({message:"BAD REQUEST",error});
   }
next()
}