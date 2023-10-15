const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const users = mongoose.model('users');

passport.use(new LocalStrategy(
    //tell which user is ised as the username
    { usernameField: 'email' },

    //provide function for valid
    async (username, password, done) => {
        try {
            const user = await users.findOne({ email: username });

            //if fail
            if(!user) {
                return done(null, false, { message: 'Unrecognized username' });
            }

            //test password
            if(!user.validatePassword(password)) {
                return done(null, false, { message: 'Incorrect password' });
            }

            // passed
            return done(null, user);
        } catch (e) {
            return done (e);
        }
    }
))