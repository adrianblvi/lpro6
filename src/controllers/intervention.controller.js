const interventionCtrls = {}
const Chart = require('chart.js');
const Intervention = require('../models/Intervention');
const intData = require('../models/InterventionData');


interventionCtrls.renderIntList = async (req, res) => {
    const interventions = await Intervention.find({ 'id_bombero': req.user.id });
    const num = interventions.length;
    const showing = 3;
    res.render('intervention/list', { interventions, num, showing });
}

interventionCtrls.renderIntStats = async (req, res) => {
    const Stats = await Intervention.findById(req.params.id);
    const date = Stats.startdate.toString().trim();
    const dateEnd = Stats.enddate.toString();
    const fecha = date.split(' ')[0];
    const horaIni = date.split(' ')[1];
    const horaFin = dateEnd.split(' ')[1];
    const duracion = obtainDuration(horaIni, horaFin);
    const datosInt = await intData.find({ 'id_intervention': Stats.id });
    const datelist = [];
    for (let i = 0; i < datosInt.length; i++) {
        datelist.push(datosInt[i].date);
    }
    const temp = ['35.5', '36.2', '35.8', '36.5', '36.9', '37.1', '37.2','36.5','36.4','36.1'];
    const pulse = ['83.5', '86.2', '88.8', '87.5', '88.9', '89.1', '87.2','86.5','90.4','88.1'];
    const labels = datelist;
    res.render('intervention/stats', { Stats, fecha, duracion, temp, labels, pulse });
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


function secondsToString(seconds) {
    var hour = Math.floor(seconds / 3600);
    hour = (hour < 10) ? '0' + hour : hour;
    var minute = Math.floor((seconds / 60) % 60);
    minute = (minute < 10) ? '0' + minute : minute;
    var second = seconds % 60;
    second = (second < 10) ? '0' + second : second;
    return hour + ':' + minute + ':' + second;
}


function obtainDuration(horaIni, horaFin) {
    const htos_horaini = horaIni.split(':')[0] * 3600;
    const htos_horafin = horaFin.split(':')[0] * 3600;
    const mintos_horaini = horaIni.split(':')[1] * 60;
    const mintos_horafin = horaFin.split(':')[1] * 60;
    const seghoraini = horaIni.split(':')[2];
    const seghorafin = horaFin.split(':')[2];
    const totalseg_horaini = parseInt(htos_horaini, 10) + parseInt(mintos_horaini, 10) + parseInt(seghoraini, 10);
    const totalseg_horafin = parseInt(htos_horafin, 10) + parseInt(mintos_horafin, 10) + parseInt(seghorafin, 10);
    const duracion = totalseg_horafin - totalseg_horaini;
    return secondsToString(duracion);
}
module.exports = interventionCtrls;