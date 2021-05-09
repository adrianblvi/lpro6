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
    const date = new Date();
    const date_tosaved = date.getUTCDate() + '/' + (date.getUTCMonth() + 1) + '/' + date.getFullYear();
    const date_tosaveh = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    const date_def = date_tosaved + ' ' + date_tosaveh;
    const newIntervention = new Intervention({
        id_bombero: req.user.id,
        startdate: date_def
    });
    const int = await newIntervention.save();
    res.render('intervention/intervention');
}

interventionCtrls.finishIntervention = async (req, res) => {
    const interventions = await Intervention.find({ id_bombero: req.user.id });
    const id_toupdate = interventions[interventions.length - 1].id;
    const date = new Date();
    const date_tosaved = date.getUTCDate() + '/' + (date.getUTCMonth() + 1) + '/' + date.getFullYear();
    const date_tosaveh = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    const date_def = date_tosaved + ' ' + date_tosaveh;
    const int_toup = await Intervention.findByIdAndUpdate(id_toupdate, { 'enddate': date_def });
    res.redirect('list');
}


module.exports = interventionCtrls;