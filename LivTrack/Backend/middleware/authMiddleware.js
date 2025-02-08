const jwt = require("jsonwebtoken");
const User = require("../userModels/userModel.js");

// // verify token
// exports.protect = async (req, res, next) => {

//   try {
//     let token;

//     if (
//       req.headers.authorization &&
//       req.headers.authorization.startsWith("Bearer")
//     ) {
//       token = req.headers.authorization.split(" ")[1];
//     }

//     if (!token) {
//       return res
//         .status(401)
//         .json({ status: "fail", message: "Not logged in!" });
//     }
//     console.log(token);
//     // Synchronous way to verify JWT
//     const decoded = jwt.verify(token, process.env.JWT_SECRET); // Removed promisify
//     console.log("Decoded JWT:", decoded); // Log decoded token

//     req.user = await User.findById(decoded.id);
//     if (!req.user) {
//       return res
//         .status(401)
//         .json({ status: "fail", message: "User no longer exists!" });
//     }

//     next();
//   } catch (err) {
//     res
//       .status(401)
//       .json({ status: "fail", message: "Invalid or expired token!" });
//   }
// };
exports.protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      console.log("Received Token:", token); // Log the token
    }

    if (!token) {
      return res
        .status(401)
        .json({ status: "fail", message: "Not logged in!" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded); // Log the decoded payload

    req.user = await User.findById(decoded.id);
    if (!req.user) {
      return res
        .status(401)
        .json({ status: "fail", message: "User no longer exists!" });
    }

    next();
  } catch (err) {
    console.error("JWT Verification Failed:", err);
    res
      .status(401)
      .json({ status: "fail", message: "Invalid or expired token!" });
  }
};
