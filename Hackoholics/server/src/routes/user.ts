import express from "express";
import { updateEmail, updatePassword } from "../controllers/user";

var router = express.Router();

router.put("/updatepassword", updatePassword);

router.put("/updateemail", updateEmail);

export default router;