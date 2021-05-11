const router = require('express').Router();

const { isAuthenticated } = require('../helpers/middlewares');

const { renderTrainList, finishTraining, newTraining, renderTrainStats } = require('../controllers/training.controller');

router.get('/train/list', isAuthenticated, renderTrainList);
router.get('/train/new', isAuthenticated, newTraining);
router.get('/train/end', isAuthenticated, finishTraining);
router.get('/train/list/:id', isAuthenticated, renderTrainStats);

module.exports = router;