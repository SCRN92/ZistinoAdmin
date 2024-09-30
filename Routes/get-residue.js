var express = require('express');
var router = express.Router();
var Users = require('../Models/userModel');
var passport = require('passport');
var wasteReceiveds = require('../Models/wasteReceived')
var category = require('../Models/category')

router.all("*", function (req, res, next) {
    return next();
});
/* GET home page. */
router.get('/', function (req, res, next) {
    wasteReceiveds.find({}).exec(function (er, list) {
        //console.log(list)
        category.find({}).exec(function (er, categories) {
            console.log(list);
            res.render('get-residue', { title: 'ثبت دریافتی پسماند', list: list, categories: categories });
        })
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

router.post('/newWasteReceived', function (req, res, next) {
    wasteReceiveds.findOne({ _id: req.body.id }, function (er, wasteReceived) {
        if (!wasteReceived) {
            new wasteReceiveds({
                driver: req.body.driver,
                customer: req.body.customer,
                weight: convertfa2en(req.body.weight),
                category: req.body.category,
                description: req.body.description,
                total: convertfa2en(req.body.total)
            }).save(function () {
                res.send("ok");
            })
        } else {
            wasteReceiveds.updateOne({ _id: req.body.id }, { driver: req.body.driver, customer: req.body.customer, weight: req.body.weight, category: req.body.category, description: req.body.description, total: req.body.total }, function (err) {
                console.log("wasteReceived update msg: " + err)
                res.send("ok")
            })
        }
    })
})
router.post('/deleteWasteReceived', function (req, res, next) {
    wasteReceiveds.deleteOne({ _id: req.body.id }, function (err) {
        console.log("wasteReceived delete msg: " + err)
        res.send("ok")
    })
})
module.exports = router;

