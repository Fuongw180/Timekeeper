import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";
passport.use(
    "local",
    new LocalStrategy((username, password, done) => {
        try {
            if (username === "admin" && password === "123456") {
                return done(null, { id: 1, username: "admin" });
            } else {
                return done(null, false, {
                    message: "Incorrect username or password",
                });
            }
        } catch (error) {
            return done(error, false);
        }
    })
);
// Serialize and deserialize user
passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    try {
        return done(null, { id: 1, username: "admin" });
    } catch (error) {
        return done(error, null);
    }
});

export default passport;
