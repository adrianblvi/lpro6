const router = require('express').Router();

const { isAuthenticated } = require('../helpers/middlewares');

const { renderTrainList } = require('../controllers/training.controller');

router.get('/train/list', isAuthenticated, renderTrainList);

module.exports = router;