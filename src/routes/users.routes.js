const router = require("express").Router();
const { isAuthenticated } = require('../helpers/middlewares');
const { signin, renderSignin, logout, renderProfile } = require('../controllers/users.controller');

router.get('/users/profile', isAuthenticated, renderProfile);
router.get('/users/login', renderSignin);
router.post('/users/login', signin);
router.get('/users/logout', logout);

module.exports = router;