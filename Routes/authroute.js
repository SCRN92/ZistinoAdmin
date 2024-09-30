const express = require('express');
const authroute = express.Router();
// const bodyParser = require('body-parser')
// const urlencodedParser = bodyParser.urlencoded({ extended: false })
const authcontroller = require('../Controllers/authcontroller');

authroute.route('/logout').get(authcontroller.logout)

var login = require('../Routes/login')
authroute.get('/login',login)

authroute.post('/login', authcontroller.login);

authroute.get('/register', (req, res, next) => {
    res.render('auth/auth-register', { title: 'Register', layout: 'layout/layout-without-navbar' });
})

authroute.post('/register', authcontroller.signup);

authroute.get('/forgot-password', (req, res, next) => {
    res.render('auth/auth-recoverpw', { title: 'Forgot-Password', layout: 'layout/layout-without-navbar' });
})
authroute.post('/forgot-password', authcontroller.sendmail);

authroute.get('/resetpassword/:resettoken', authcontroller.verifytoken, (req, res, next) => {
    res.render('auth/auth-resetpsw', { title: 'Reset Password', layout: 'layout/layout-without-navbar' });
})

authroute.post('/resetpassword/:resettoken', authcontroller.resetpassword);



module.exports = authroute;