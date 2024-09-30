var express = require('express');
var router = express.Router();
var Users = require('../Models/userModel');
var passport = require('passport');
var orders = require('../Models/orders');

router.all("*", function (req, res, next) {
    return next();
});

router.get('/', function (req, res, next) {
    orders.find({ status: 3 }).exec(function (er, list) {
        res.render('orders', { title: 'سفارشات', list: list });
    })

});
function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function convertfa2en(string) {
    string = replaceAll(string, "تومان", "");
    string = replaceAll(string, "٬", "");
    string = replaceAll(string, " ", "");
     
    return string.replace(/[\u0660-\u0669]/g, function (c) {
        return c.charCodeAt(0) - 0x0660;
    }).replace(/[\u06f0-\u06f9]/g, function (c) {
        return c.charCodeAt(0) - 0x06f0;
    });
}

router.post('/changeDriver', function (req, res, next) {
    orders.findOne({ _id: req.body.id }, function (er, order) {
        if (!order) {
        } else {
            orders.updateOne({ _id: req.body.id }, { driver: req.body.driver }, function (err) {
                console.log("Order driver update msg: " + err)
                res.send("ok")
            })
        }
    })
})

module.exports = router;

