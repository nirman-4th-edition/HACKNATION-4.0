import Router from "express";
export const profileRouter = Router();
profileRouter.get("/profile", (req, res) => {
	console.log(req);
	res.sendFile("/pages/profile.html");
});
