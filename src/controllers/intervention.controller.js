const interventionCtrls = {}
const Chart = require('chart.js');
const Intervention = require('../models/Intervention');


interventionCtrls.renderIntList = async (req, res) => {
    const interventions = await Intervention.find({ 'id_bombero': req.user.id });
    const num = interventions.length;
    const showing = 3;
    res.render('intervention/list', { interventions, num, showing });
}

interventionCtrls.renderIntStats = async (req, res) => {
    const Stats = await Intervention.findById(req.params.id);
    const date = Stats.startdate.toString().trim();
    const fecha = date.substring(0, 15).trim();
    const day = fecha.substring(0, 3);
    const month = fecha.substring(4, 7);
    const monthday = fecha.substring(8, 11);
    const year = fecha.substring(11, 15);
    res.render('intervention/stats', { Stats, day, month, monthday, year });
}


interventionCtrls.newIntervention = async (req, res) => {

    const newIntervention = new Intervention({
        id_bombero: req.user.id
    });
    const int = await newIntervention.save();
    const id_int = int.id;

    res.render('intervention/intervention', { id_int });
}

interventionCtrls.finishIntervention = async (req, res) => {
    //const { id_int } = req.body;
    //console.log(id_int);
    console.log(req.body);
    res.send('ok');
}


module.exports = interventionCtrls;