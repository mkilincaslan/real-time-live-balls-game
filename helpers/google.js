const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

// models
const User = require('../models/Users');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_LOGIN_CLIENT_ID,
    clientSecret: process.env.GOOGLE_LOGIN_SECRET_ID,
    callbackURL: process.env.GOOGLE_LOGIN_CALLBACK_URL
},
    ((accessToken, refreshToken, profile, done) => {
        console.log(profile);

        User.findOrCreate({
            'googleId': profile.id
        }, {
            name: profile.name.givenName,
            surname: profile.name.familyName,
            profilePhotoUrl: profile.photos[0].value
        }, (err, user) => {
            console.log(err);
            return done(err, user);
        });
    })
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = passport;