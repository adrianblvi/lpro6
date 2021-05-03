const router = require('express').Router();

const { isAuthenticated } = require('../helpers/middlewares');

const { renderIntList, renderIntStats } = require('../controllers/intervention.controller');

router.get('/int/list', isAuthenticated, renderIntList);
router.get('/int/list/:id', isAuthenticated, renderIntStats);

module.exports = router;