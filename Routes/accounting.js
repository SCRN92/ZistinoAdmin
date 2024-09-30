var express = require('express');
var router = express.Router();
const orders = require("../Models/orders");

router.all("*", function (req, res, next) {
    return next();
});

router.get('/', function (req, res, next) {
    orders.find({ status: 2 }).exec(function (er, list) {
        console.log(list)
        res.render('accounting', { title: 'بستانکاری مشتریان و رانندگان' });
    })
});
module.exports = router;