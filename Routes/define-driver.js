var express = require('express');
var router = express.Router();
var Users = require('../Models/userModel');
var passport = require('passport');
const drivers = require('../Models/driver');

router.all("*", function (req, res, next) {
    return next();
});
/* GET home page. */
router.get('/', function (req, res, next) {
    drivers.find({}).exec(function (er, list) {
        //console.log(list)
        res.render('define-driver', { title: 'تعریف  راننده', list: list });
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

router.post('/newDriver', function (req, res, next) {
    drivers.findOne({ _id: req.body.id }, function (er, driver) {
        if (!driver) {
            new drivers({
                name: req.body.name,
                family: req.body.family,
                phoneNumber: convertfa2en(req.body.phoneNumber),
                address: req.body.address,
                userName: req.body.userName,
                pass: req.body.pass,
                nationalCode: convertfa2en(req.body.nationalCode),
                dateOfBirth: req.body.dateOfBirth,
                numberPlates: req.body.numberPlates,
                toPay: convertfa2en(req.body.toPay),
                carModel: req.body.carModel,
                description: req.body.description
            }).save(function () {
                res.send("ok");
            })
        } else {
            drivers.updateOne({ _id: req.body.id }, { name: req.body.name, family: req.body.family, phoneNumber: convertfa2en(req.body.phoneNumber), address: req.body.address, userName: req.body.userName, pass: req.body.pass, nationalCode: convertfa2en(req.body.nationalCode), dateOfBirth: req.body.dateOfBirth, numberPlates: req.body.numberPlates, toPay: convertfa2en(req.body.toPay), carModel: req.body.carModel, description: req.body.description }, function (err) {
                console.log("drivers update msg: " + err)
                res.send("updated")
            })
        }
    })
})

router.post('/deleteDriver', function (req, res, next) {
    drivers.deleteOne({ _id: req.body.id }, function (err) {
        console.log("driver delete msg: " + err)
        res.send("ok")
    })
})
module.exports = router;

