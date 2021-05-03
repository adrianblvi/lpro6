const router = require('express').Router();

const { isAuthenticated } = require('../helpers/middlewares');

const { renderSimList } = require('../controllers/simulacrum.controller');

router.get('/sim/list', isAuthenticated, renderSimList);

module.exports = router;