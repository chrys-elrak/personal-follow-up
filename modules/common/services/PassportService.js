const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const UserService = require('./UserService');
const passport = require('passport');
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.TOKEN_SECRET,
    issuer: process.env.ISS_TOKEN
};

passport.use('jwt', new JwtStrategy(opts, async (payload, done) => {
    try {
        const [user] = await UserService.getUserById(payload.sub);
        if (!user) {
            return done(null, false);
        }
        return done(null, user);
    } catch (e) {
        return done(e, false);
    }
}));