const { User } = require("../models");
const bcrypt  = require('bcrypt');

module.exports = function(passport) {
    const LocalStrategy = require('passport-local').Strategy;

    // login
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, email, password, done) {
        var isValidPassword = function(userpass, password) {
            return bcrypt.compareSync(password, userpass);
        }

        User.findOne({
            where: {
                email: email
            }
        }).then(function(user) {
    
            if (!user) {
                return done(null, false, {
                    message: 'Email does not exist'
                });
            }
    
            if (!isValidPassword(user.password, password)) {
                return done(null, false, {
                    message: 'Incorrect credentials.'
                });
            }
            var userinfo = user.get();
            console.log(userinfo);
            const filterUser = {
                id: userinfo.id,
                email: userinfo.email
            }
            return done(null, filterUser);
    
        }).catch(function(err) {
            console.log("Error:", err);
            return done(null, false, {
                message: 'Something went wrong with your Signin'
            });
        });
    }));
    
    
    passport.serializeUser(function(user, done) {
        done(null, { id: user.id });
    });
    
    passport.deserializeUser(async function(user, done) {
        try {
            const userFound = await User.findOne({where: {id:user.id}});
            const filterUser = {
                id: userFound.id,
                email: userFound.email
            }
            if(userFound)
                return done(null, filterUser);
        } catch (error) {
            return done(error, null, {
                message: 'Something went wrong with your login'
            });
        }
    });
}