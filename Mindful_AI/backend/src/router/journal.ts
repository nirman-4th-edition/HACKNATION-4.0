import { Router } from "express";
export const journalRouter = Router();
journalRouter.get("journal", (req, res) => {
	res.sendFile("/pages/journal.html");
});
