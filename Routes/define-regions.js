var express = require('express');
var router = express.Router();
var Users = require('../Models/userModel');
var passport = require('passport');
var regions = require('../Models/regions')

router.all("*", function (req, res, next) {
    return next();
});
/* GET home page. */
router.get('/', function (req, res, next) {

    regions.find({}).exec(function (er, list) {
        // console.log(list)
        res.render('define-regions', { title: 'تعریف مناطق', list: list });
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

router.post('/newRegion', function (req, res, next) {
    regions.findOne({ _id: req.body.id }, function (er, region) {
        if (!region) {
            new regions({
                name: req.body.name,
                address: req.body.address
            }).save(function () {
                res.send("ok");
            })
        } else {
            regions.updateOne({ _id: req.body.id }, { name: req.body.name, address: req.body.address }, function (err) {
                console.log("Region update msg: " + err)
                res.send("updated")
            })
        }
    })
})
router.post('/deleteRegion', function (req, res, next) {
    regions.deleteOne({ _id: req.body.id }, function (err) {
        console.log("Region delete msg: " + err)
        res.send("ok")
    })
})
module.exports = router;

