const express = require('express');
const exphbs = require("express-handlebars");
const path = require("path");
const flash = require("connect-flash");
const passport = require('passport');
const methodOverride = require('method-override');
const session = require('express-session');
const Handlebars = require('handlebars');
const favicon = require('serve-favicon');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const { isAuthenticated, isAdmin } = require('./helpers/middlewares')
const { createAdminUser } = require("./libs/createUser");
const { createIntervention } = require("./libs/createIntervention");

// Initializations

const app = express();
require('./config/passport');
createAdminUser();
//createIntervention();


// Settings

app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine(
    ".hbs",
    exphbs({
        handlebars: allowInsecurePrototypeAccess(Handlebars),
        defaultLayout: "main",
        layoutsDir: path.join(app.get("views"), "layouts"),
        partialsDir: path.join(app.get("views"), "partials"),
        extname: ".hbs",
    })
);
app.set("view engine", ".hbs");

// Middlewares

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(favicon(path.join(__dirname, 'public/images/', 'favicon.ico')));

// Global Variables

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

// Routes

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/home', isAuthenticated, (req, res) => {
    res.render('home');
});

app.use(require("./routes/intervention.routes"));
app.use(require("./routes/simulacrum.routes"));
app.use(require("./routes/training.routes"));
app.use(require("./routes/users.routes"));
app.use(require("./routes/admin.routes"));
/*app.use(require("./routes/users.routes"));
app.use(require("./routes/admin.routes"));
app.use(require("./routes/ticket.routes"));
app.use(require("./routes/profile.routes"));
*/

// Static Files

app.use(express.static(path.join(__dirname, 'public')));


module.exports = app;