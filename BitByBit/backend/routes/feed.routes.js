import { Router } from "express";
import * as feedController from "../controllers/feed.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.post("/create-loan", verifyJWT, feedController.createLoan);
router.get("/loans", verifyJWT, feedController.getAllLoans);
router.get("/loans/:loanId", verifyJWT, feedController.getLoanDetails);
router.post("/fund-loan/:loanId", verifyJWT, feedController.loanFunded);
router.post("/repay-loan/:loanId", verifyJWT, feedController.loanRepaid);

export default router;
