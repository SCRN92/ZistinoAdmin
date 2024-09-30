const express = require('express');
const route = express.Router();

const authcontroller = require('../Controllers/authcontroller');

route.use('/', authcontroller.islogin);

const defineregions = require('../Routes/define-regions')
const definecategory = require('../Routes/define-category')
const defineproduct = require('../Routes/define-product')
const definedriver = require('../Routes/define-driver')
const manualrequests = require('../Routes/manual-requests')
const getresidue = require('../Routes/get-residue')
const orders = require('../Routes/orders')
const lottery = require('../Routes/lottery')
const aboutus = require('../Routes/aboutus')
const rejectedOrders = require('../Routes/rejectedOrders')
const accounting = require('../Routes/accounting')
const shop = require('../Routes/shop')

route.use('/', defineregions)
route.use('/index', defineregions)
route.use('/define-regions', defineregions)
route.use('/define-category', definecategory)
route.use('/define-product', defineproduct)
route.use('/define-driver', definedriver)
route.use('/manual-requests', manualrequests)
route.use('/get-residue', getresidue)
route.use('/orders', orders)
route.use('/lottery', lottery)
route.use('/about-us', aboutus)
route.use('/rejected-orders',rejectedOrders)
route.use('/accounting', accounting)
route.use('/shop', shop)

route.get('/auth-login', (req, res, next) => {
    res.render('auth/auth-login', { title: 'ورود', layout: 'layout/layout-without-navbar' });
})
route.get('/auth-recoverpw', (req, res, next) => {
    res.render('auth-recoverpw', { title: 'فراموشی رمز عبور', layout: 'layout/layout-without-navbar' });
})
route.get('/auth-lock-screen', (req, res, next) => {
    res.render('auth-lock-screen', { title: 'قفل صفحه', layout: 'layout/layout-without-navbar' });
})
route.get('/auth-logout', (req, res, next) => {
    res.render('auth-logout', { title: 'خروج', layout: 'layout/layout-without-navbar' });
})
route.get('/auth-confirm-mail', (req, res, next) => {
    res.render('auth-confirm-mail', { title: 'تایید ایمیل', layout: 'layout/layout-without-navbar' });
})
route.get('/auth-email-verification', (req, res, next) => {
    res.render('auth-email-verification', { title: 'تاییدیه ایمیل', layout: 'layout/layout-without-navbar' });
})
route.get('/auth-two-step-verification', (req, res, next) => {
    res.render('auth-two-step-verification', { title: 'تایید دو مرحله ای', layout: 'layout/layout-without-navbar' });
})

route.get('/layouts-horizontal', (req, res, next) => {
    res.render('index', { title: 'Horizontal Layout', page_title: 'Horizontal', folder: 'Layouts', layout: 'layout/layout-horizontal' });
})


module.exports = route;