var express = require('express');
var router = express.Router();
var Users = require('../Models/userModel');
var passport = require('passport');
const manualRequests = require('../Models/phoneRequests');
const orders = require('../Models/orders');

router.all("*", function (req, res, next) {
    return next();
});
/* GET home page. */
router.get('/', function (req, res, next) {
    orders.find({  }).exec(function (er, list) {
        console.log(list)
        res.render('manual-requests', { title: ' سفارشات تلفنی', list: list });
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

router.post('/newManualRequests', function (req, res, next) {
    orders.findOne({ _id: req.body.id }, function (er, order) {
        if (!order) {
            new orders({
                fullName: req.body.fullName,
                address: req.body.address,
                phoneNumber: convertfa2en(req.body.phoneNumber),
                amountOfLoad: convertfa2en(req.body.amountOfLoad),
                category: req.body.category,
                driver: req.body.driver,
                status: 0,
                isManual: true,
                timeRange: convertfa2en(req.body.timeRange),
                description: req.body.description
            }).save(function () {
                res.send("ok");
            })
        } else {
            orders.updateOne({ _id: req.body.id },
                {
                    fullName: req.body.fullName,
                    address: req.body.address,
                    phoneNumber: convertfa2en(req.body.phoneNumber),
                    amountOfLoad: convertfa2en(req.body.amountOfLoad),
                    category: req.body.category,
                    driver: req.body.driver,
                    timeRange: convertfa2en(req.body.timeRange),
                    description: req.body.description,
                    isManual: true
                }, function (err) {
                    console.log("manual requests update msg: " + err)
                    res.send("updated")
                })
        }
    })
})

router.post('/deleteManualRequest', function (req, res, next) {
    manualRequests.deleteOne({ _id: req.body.id }, function (err) {
        console.log("manual request delete msg: " + err)
        res.send("ok")
    })
})
module.exports = router;

