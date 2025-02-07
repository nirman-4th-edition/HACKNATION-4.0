import express from "express";
import { serverSession } from "./middleware";
import { indexRouter } from "./router";
import { profileRouter } from "./router/profile";
import { chatRouter } from "./router/chat";
import { authRouter } from "./router/auth";
import { journalRouter } from "./router/journal";
import passport from "passport";
import path from "path";

const http = express();
export const router = express.Router();

http.use(serverSession);
http.use(passport.initialize());
http.use(passport.session());
http.use(express.static(path.join(process.cwd(), "../frontend/pages")));
http.use(express.static(path.join(process.cwd(), "../frontend/")));
http.use(router);
http.use(indexRouter);
http.use(profileRouter);
http.use(chatRouter);
http.use(authRouter);
http.use(journalRouter);

http.listen(process.env.PORT_HTTP, () => {
	console.log(`Http Server connected on port: ${process.env.PORT_HTTP}`);
});
