const usersCtrl = {};

// Models
const User = require('../models/User');

// Modules
const passport = require("passport");


usersCtrl.renderProfile = (req, res) => {
    res.render('users/profile');
};

usersCtrl.renderSignin = (req, res) => {
    res.render('users/login');
};

usersCtrl.signin = passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/users/login",
    failureFlash: true
});

usersCtrl.logout = (req, res) => {
    req.logout();
    console.log('Logged out!');
    res.redirect('/');
};

module.exports = usersCtrl;