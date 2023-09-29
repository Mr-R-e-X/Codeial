const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID: "803960775872-8o0n3d6k42n9anvjuvc1e023rr1b6q51.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8000/users/auth/google/callback",
        // passReqToCallback: true
    },
     (accessToken, refreshToken, profile, done) => {
        User.findOne({email: profile.emails[0].value})
            .exec().then((user) => {
                console.log(profile);
                if(user){
                    // if found set this user as req.user
                    return done(null, user);
                }else{
                    // if not create the user and set it as req.user
                    User.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        password: crypto.randomBytes(20).toString('hex'),
                    }).then((user) => { return done(null, user) }).catch((err) => {console.log(`Error in creating user ${err}`); });
                }
            }).catch((err) => {
                console.log(`Error in Google strategy-passport ${err}`);
                return;
            });
    }
));

module.exports = passport;