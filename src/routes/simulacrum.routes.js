const router = require('express').Router();

const { isAuthenticated } = require('../helpers/middlewares');

const { renderSimList, newSimulacrum, renderSimStats, finishSimulacrum } = require('../controllers/simulacrum.controller');

router.get('/sim/list', isAuthenticated, renderSimList);
router.get('/sim/new', isAuthenticated, newSimulacrum);
router.get('/sim/end', isAuthenticated, finishSimulacrum);
router.get('/sim/list/:id', isAuthenticated, renderSimStats);

module.exports = router;