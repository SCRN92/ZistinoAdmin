const LocalStrategy = require('passport-local').Strategy;

const User = require('../Models/userModel');

var persianDate = require('persian-date');

module.exports = function(passport) {
    passport.use('local-sms',new LocalStrategy({
        usernameField: 'phone',
        passwordField: 'code',
        passReqToCallback: true
    },function(req,phone,code,done){
        console.log(phone);
        console.log(code);
        User.findOne({phone:phone,code:code},function(error,user){
            console.log(user);
            if(user){
                User.updateOne({phone:phone},{code:""},function(er){
                    return done(null, user)
                });
            }else{
                return done(null, false);
            }
        });
    }));

    passport.use('user-local',
        new LocalStrategy({ usernameField: 'phone', passwordField: 'code' },
        (phone, password, done) => {
            console.log("phone :",phone);
        })
    );

    passport.use('local-login', new LocalStrategy({

        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, email, password, done) {

        User.findOne({ email: email }).then(function(user) {

            if (!user) {

                return done(null, false);
            }

            if (!user.correctPassword(password)) {
                return done(null, false);
            }

            return done(null, user)
        }).catch(function(err) { done(err, false) });
    }));


    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, email, password, done) {
        console.log(email);
        console.log(password);
        if (req.user) {
            return done(null, req.user);
        }

        User.findOne({ email: email }).then(function(user) {

            if (user) {

                return done(null, false);
            }

            new User({
                email: email,
                password: User.generateHash(password),
                name: req.body.name,
                family: req.body.family
            }).save(function(err, savedUser) {
                console.log(err);
                if (err) {
                    return done(err, false)
                }
                return done(null, savedUser);
            })
        }).catch(function(err) { done(err, false) });
    }));


    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
};