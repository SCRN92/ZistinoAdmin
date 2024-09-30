var express = require('express');
var router = express.Router();
var Users = require('../Models/userModel');
const passport = require('passport');

function makeid(length) {
    var result = '';
    var characters = '0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}
router.all("*", function (req, res, next) {
    return next();
});
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('auth/auth-login', { title: 'ورود', layout: 'layout/layout-without-navbar' });
});
module.exports = router;

