const User = require('../Models/userModel.js');
const crypto = require('crypto');
const catchAsync = require('../util/catchAsync');
const sendmail = require('../util/email');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

// Ensure __i18n is defined
const i18n = require("i18n-express");

// Logout user by clearing the JWT cookie
exports.logout = catchAsync(async (req, res) => {
    res.cookie('jwt', 'undefined', new Date(Date.now() + 10 * 1000));
    res.status(200).redirect('/login');
});

// Login user and send JWT token
exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        const err = new Error(i18n('Please_enter_email_and_password'), 400);
        return next(err);
    }

    // Find user by email and check password
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        const err = new Error(i18n('Invalid_email_or_password'), 401);
        err.status = 'fail';
        err.statusCode = 401;
        return next(err);
    }
    if (!await user.correctPassword(password, user.password) || !user) {
        const err = new Error(i18n('Invalid_email_or_password'), 401);
        err.statusCode = 401;
        return next(err);
    }
    const token = jwt.sign({ id: user._id }, 'this-is-my-token', { expiresIn: '90d' });

    const cookieOptions = {
        expires: new Date(
            Date.now() + 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };
    res.cookie('jwt', token, cookieOptions);

    user.password = "undefined";
    res.status(200).json({
        status: "success",
        data: { user }
    })
});

// Signup new user and send JWT token
exports.signup = catchAsync(async (req, res, next) => {
    const user = await User.create(req.body);
    res.status(200).json({
        status: "success",
        data: user
    })
});

// Send password reset email
exports.sendmail = catchAsync(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        const err = new Error(i18n('Can_not_find_user_with_this_email'), 401);
        return next(err);
    }
    const resettoken = crypto.randomBytes(32).toString('hex');
    const sendtoken = `http://127.0.0.1:` + process.env.PORT + `/resetpassword/` + resettoken;
    const mailtoken = crypto.createHash('sha256').update(resettoken).digest('hex');
    const passwordresettokenexp = Date.now() + 10 * 60 * 1000;
    await sendmail({ message: sendtoken, toid: req.body.email });
    user.passwordtoken = mailtoken;
    user.passwordtokenexp = passwordresettokenexp;
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
        status: "success",
        sendtoken
    })
});

// Verify password reset token
exports.verifytoken = catchAsync(async (req, res, next) => {
    const token = crypto.createHash('sha256').update(req.params.resettoken).digest('hex');
    const user = await User.findOne({ passwordtoken: token });
    if (!user) {
        const err = new Error(i18n('Token_is_invalid_or_expired'), 401);
        return next(err);
    }
    next();
});

// Reset user password
exports.resetpassword = catchAsync(async (req, res, next) => {
    const token = crypto.createHash('sha256').update(req.params.resettoken).digest('hex');
    const user = await User.findOne({ passwordtoken: token });
    if (!user) {
        const err = new Error(i18n('Token_is_invalid_or_expired'), 401);
        return next(err);
    }
    user.passwordtoken = "undefined";
    user.passwordresettokenexp = "undefined";
    user.password = req.body.password;
    user.confirm_password = req.body.confirm_password;
    await user.save();
    res.status(200).json({
        status: "success",
    });
});

// Check if user is logged in
exports.islogin = catchAsync(async (req, res, next) => {
    try {
        if (!req.cookies.jwt) {
            return res.status(200).redirect('/login');
        }
        const token = req.cookies.jwt;
        const decoded = await promisify(jwt.verify)(token, 'this-is-my-token');
        const crtuser = await User.findById(decoded.id);
        if (!crtuser) {
            return res.status(200).redirect('/login');
        }
        req.user = crtuser;
        res.locals.user = crtuser;
        next();
    } catch (err) {
        return res.status(200).redirect('/login');
    }
});