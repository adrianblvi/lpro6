const trainingCtrls = {}

const Training = require('../models/Training');

trainingCtrls.renderTrainList = async (req, res) => {
    const trainings = await Training.find();
    res.render('training/list', { trainings });
}

trainingCtrls.renderTrainStats = async (req, res) => {
    const Stats = await Training.findById(req.params.id);
    const date = Stats.startdate.toString().trim();
    const dateEnd = Stats.enddate.toString();
    const fecha = date.split(' ')[0];
    const horaIni = date.split(' ')[1];
    const horaFin = dateEnd.split(' ')[1];
    const duracion = obtainDuration(horaIni, horaFin);
    res.render('training/stats', { Stats, fecha, duracion });
}

trainingCtrls.newTraining = async (req, res) => {
    const date = new Date();
    const date_tosaved = date.getUTCDate() + '/' + (date.getUTCMonth() + 1) + '/' + date.getFullYear();
    const date_tosaveh = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    const date_def = date_tosaved + ' ' + date_tosaveh;
    const newTraining = new Training({
        id_bombero: req.user.id,
        startdate: date_def
    });
    const int = await newTraining.save();
    res.render('training/training');
}


trainingCtrls.finishTraining = async (req, res) => {
    const trainings = await Training.find({ id_bombero: req.user.id });
    const id_toupdate = trainings[trainings.length - 1].id;
    const date = new Date();
    const date_tosaved = date.getUTCDate() + '/' + (date.getUTCMonth() + 1) + '/' + date.getFullYear();
    const date_tosaveh = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    const date_def = date_tosaved + ' ' + date_tosaveh;
    const int_toup = await Training.findByIdAndUpdate(id_toupdate, { 'enddate': date_def });
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

module.exports = trainingCtrls;