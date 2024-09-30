var express = require('express');
var router = express.Router();
const products = require("../Models/product");

router.all("*", function (req, res, next) {
    return next();
});

router.get('/', function (req, res, next) {
    products.find({}).exec(function (er, list) {
        console.log(list)
        res.render('shop', { title: 'محصولات' });
    })
});
module.exports = router;