const trainingCtrls = {}

const Training = require('../models/Training');
const TrData = require('../models/TrainingData');

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

    const datosInt = await TrData.find({ 'id_training': Stats.id });
    const datelist = [];
    const tempInt = [];
    const tempExt = [];
    const pulse = [];
    const caidas = [];
    let haycaida = false;
    let totalTempint = 0;
    let totalpulso = 0;
    let totalcaidas = 0;
    let totalTempExt = 0;
    for (let i = 0; i < datosInt.length; i++) {
        datelist.push(datosInt[i].date);
        tempInt.push(datosInt[i].temp_int);
        tempExt.push(datosInt[i].temp_ext);
        pulse.push(datosInt[i].pulso);
        caidas.push(datosInt[i].caida);
        totalpulso += datosInt[i].pulso;
        totalTempint += datosInt[i].temp_int;
        totalTempExt += datosInt[i].temp_ext;
        totalcaidas += datosInt[i].caida;
    }
    if (totalcaidas > 0) {
        haycaida = true;
    }
    const avgTempInt = (totalTempint / datosInt.length).toFixed(2);
    const avgTempExt = (totalTempExt / datosInt.length).toFixed(2);
    const avgPulso = (totalpulso / datosInt.length).toFixed(2);
    const labels = datelist;

    res.render('training/stats', { Stats, fecha, duracion, labels, caidas, tempInt, tempExt, pulse, haycaida, avgTempInt, avgTempExt, avgPulso });
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