var express = require('express');
var router = express.Router();
var Users = require('../Models/userModel');
var passport = require('passport');
const products = require('../Models/product');

router.all("*", function (req, res, next) {
    return next();
});
/* GET home page. */
router.get('/', function (req, res, next) {
    products.find({}).exec(function (er, list) {
        //console.log(list)
        res.render('define-product', { title: 'تعریف  محصول', list: list });
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

router.post('/newProduct', function (req, res, next) {
    products.findOne({ _id: req.body.id }, function (er, product) {
        if (!product) {
            new products({
                name: req.body.name,
                price: convertfa2en(req.body.price),
                discount: convertfa2en(req.body.discount),
                category: req.body.category,
                inventory: convertfa2en(req.body.inventory),
                description: req.body.description
            }).save(function () {
                res.send("ok");
            })
        } else {
            products.updateOne({ _id: req.body.id }, { name: req.body.name, price: convertfa2en(req.body.price), discount: convertfa2en(req.body.discount), category: req.body.category, inventory: convertfa2en(req.body.inventory), description: req.body.description }, function (err) {
                console.log("product update msg: " + err)
                res.send("updated")
            })
        }
    })
})

router.post('/deleteProduct', function (req, res, next) {
    products.deleteOne({ _id: req.body.id }, function (err) {
        console.log("product delete msg: " + err)
        res.send("ok")
    })
})
module.exports = router;

