import { Router } from "express";
import {handleContactForm} from "../controllers/contact.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();


router.route("/contact").post(verifyJWT, handleContactForm);


export default router;
