import jwt from "jsonwebtoken"
export const authval = (req,res,next)=>{
      const auth = req.headers['authorization'];
    if(!auth){
        res.status(403).json({
            message:"Pls Login First",
        })
    }
    try {
        const decoded = jwt.verify(auth,process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({
            message:"Session Expired Pls Login Again",
        })
    }
}