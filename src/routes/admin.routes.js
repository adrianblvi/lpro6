const router = require('express').Router();

const {
    getUsers,
    getStats,
    viewUser,
    AddNewUser,
    newUser

} = require('../controllers/admin.controller');


// Middlewares 
const { isAuthenticated, isAdmin } = require('../helpers/middlewares');


// ROUTES

router.get('/admin/users', isAuthenticated, isAdmin, getUsers);

router.get('/admin/users/new', isAuthenticated, isAdmin, newUser);

router.post('/admin/users/new', isAuthenticated, isAdmin, AddNewUser);

router.get('/admin/users/:id', isAuthenticated, isAdmin, viewUser);

module.exports = router;