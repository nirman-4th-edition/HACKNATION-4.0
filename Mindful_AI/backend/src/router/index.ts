import { Router } from "express";
export const indexRouter = Router();
indexRouter.get("/", (req, res) => {
	res.sendFile("/pages/index.html");
});
indexRouter.get("/styles", (req, res) => {
	res.sendFile("/css/style.css");
});
