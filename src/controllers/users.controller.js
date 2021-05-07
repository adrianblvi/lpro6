const usersCtrl = {};

// Models
const User = require('../models/User');
const Intervention = require('../models/Intervention');
const Simulacrum = require('../models/Simulacrum');
const Training = require('../models/Training');

// Modules
const passport = require("passport");


usersCtrl.renderProfile = async (req, res) => {
    const numInt = await Intervention.find({ 'id_bombero': req.user.id }).countDocuments();
    const numSim = await Simulacrum.find({ 'id_bombero': req.user.id }).countDocuments();
    const numTrain = await Training.find({ 'id_bombero': req.user.id }).countDocuments();
    res.render('users/profile', { numInt, numSim, numTrain });
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