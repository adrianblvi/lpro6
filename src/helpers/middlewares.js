const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg', 'Not Authorized.');
    res.redirect('/users/login');
};

helpers.isAdmin = (req, res, next) => {
    if (req.user.is_superUser) return next();
    //req.flash('error_msg', 'Not Authorized.');
    res.render('403page');
};

module.exports = helpers;