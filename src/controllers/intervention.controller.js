const interventionCtrls = {}
const Chart = require('chart.js');

const Intervention = require('../models/Internvention');

interventionCtrls.renderIntList = async (req, res) => {
    console.log(req.user.id);
    const interventions = await Intervention.find();
    res.render('intervention/list', { interventions });
}

interventionCtrls.renderIntStats = async (req, res) => {
    const Stats = await Intervention.findById(req.params.id);
    const date = Stats.date.toString().trim();
    const fecha = date.substring(0, 15);
    console.log(date);
    console.log(date.substring(0, 15));
    res.render('intervention/stats', { Stats, fecha });
}

module.exports = interventionCtrls;