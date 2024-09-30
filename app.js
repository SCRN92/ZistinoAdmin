const express = require('express');
const app = express();
const path = require('path');
const route = require('./Routes/route');
const authroute = require('./Routes/authroute');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const i18n = require("i18n-express");
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const upload = require('express-fileupload');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Views'));
app.use(upload());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger('dev'));

app.use(express.json());
app.use(session({ resave: false, saveUninitialized: true, secret: 'nodedemo' }));
app.use(i18n({
    translationsPath: path.join(__dirname, 'i18n'),     // Specify translations files path.
    siteLangs: ["fa", "en", "de", "ru", "it", "fr"],    // Available languages.  
    cookieLangName: 'ulang',                            // Specify cookie name.
    defaultLang: 'en',                                  // Specify default language.
    textsVarName: 'translation',                        // Specify the variable name to be used in views.
    paramLangName: 'lang',                              // Specify the get parameter name to be used in views.
    browserEnable: true                                 // Enable browser language detection.
}));

require('./Config/passport')(passport);                 

app.use(passport.initialize());                          // passport initialization
app.use(passport.session());                             // passport session

app.use(cookieParser());

app.set('layout', 'layout/layout');
app.use(expressLayouts);
app.use(express.static(__dirname + '/public'));


app.use('/', authroute);

var login = require('./Routes/login')
app.use('/login', login)
app.use('/', route);
app.use((err, req, res, next) => {
    let error = { ...err }
    if (error.name === 'JsonWebTokenError') {
        err.message = "please login again";
        err.statusCode = 401;
        return res.status(401).redirect('view/login');
    }
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'errors';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,

    })
});
module.exports = app;