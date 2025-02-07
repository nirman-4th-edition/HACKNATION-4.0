import session from "express-session";
import passport from "passport";

export const serverSession = session({
	secret: "IHaveNoImportantSecretsToGiveHere",
	resave: false,
	saveUninitialized: true,
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 7,
		httpOnly: true,
		secure: process.env.COOKIE_SESSION_KEY,
	},
});
