var express = require('express');
var router = express.Router();
var Users = require('../Models/userModel');
var passport = require('passport');
var categories = require('../Models/category')

router.all("*", function (req, res, next) {
    return next();
});
/* GET home page. */
router.get('/', function (req, res, next) {
    categories.find({}).exec(function (er, list) {
        console.log(list)
        res.render('define-category', { title: 'تعریف دسته بندی', list: list });
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

router.post('/newCategory', function (req, res, next) {
    categories.findOne({ _id: req.body.id }, function (er, category) {
        if (!category) {
            new categories({
                name: req.body.name,
                price: convertfa2en(req.body.price),
                min: convertfa2en(req.body.min),
                max: convertfa2en(req.body.max)
            }).save(function () {
                res.send("ok");
            })
        } else {
            categories.updateOne({ _id: req.body.id },{ name: req.body.name ,  price: convertfa2en(req.body.price), min: convertfa2en(req.body.min), max: convertfa2en(req.body.max) }, function (err) {
                console.log("category update msg: " + err)
                res.send("updated")
            })
        }
    })
})

router.post('/deleteCategory', function (req, res, next) {
    categories.deleteOne({ _id: req.body.id }, function (err) {
        console.log("category delete msg: " + err)
        res.send("ok")
    })
})
module.exports = router;

