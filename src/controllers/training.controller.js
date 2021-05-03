const trainingCtrls = {}

const Training = require('../models/Training');

trainingCtrls.renderTrainList = async (req, res) => {
    res.render('training/list');
}

module.exports = trainingCtrls;