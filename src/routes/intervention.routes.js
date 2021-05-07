const router = require('express').Router();

const { isAuthenticated } = require('../helpers/middlewares');

const { renderIntList, renderIntStats, newIntervention, finishIntervention } = require('../controllers/intervention.controller');

router.get('/int/list', isAuthenticated, renderIntList);
router.get('/int/new', isAuthenticated, newIntervention);
router.get('/int/end', isAuthenticated, finishIntervention);
router.get('/int/list/:id', isAuthenticated, renderIntStats);

module.exports = router;