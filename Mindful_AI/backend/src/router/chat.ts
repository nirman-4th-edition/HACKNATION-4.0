import Router from "express";
export const chatRouter = Router();
chatRouter.get("/chat", (req, res) => {
	res.redirect("/pages/chat.html");
});
