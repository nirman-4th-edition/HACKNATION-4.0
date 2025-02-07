import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../database/schemas/userSchema";

export default passport.use(
	"google",
	new GoogleStrategy(
		{
			clientID: process.env.OAUTH_CLIENT_ID_GOOGLE,
			clientSecret: process.env.OAUTH_CLIENT_SECRET_GOOGLE,
			callbackURL: "/auth/google/redirect",
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				let user = await User.findOne({ googleId: profile.id });

				if (!user) {
					user = new User({
						googleId: profile.id,
						email: profile.emails[0].value,
						name: profile.displayName,
					});

					await user.save();
				}

				done(null, user);
			} catch (err) {
				done(err, null);
			}
		},
	),
);

passport.serializeUser((user, done) => {
	done(null, user._id);
});

passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => {
		done(err, user);
	});
});
