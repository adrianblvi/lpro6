const simulacrumCtrls = {}

const Simulacrum = require('../models/Simulacrum');
const SimData = require('../models/SimulacrumData');

simulacrumCtrls.renderSimList = async (req, res) => {
    const simulacrums = await Simulacrum.find();
    res.render('simulacrum/list', { simulacrums });
}

simulacrumCtrls.renderSimStats = async (req, res) => {
    const Stats = await Simulacrum.findById(req.params.id);
    const date = Stats.startdate.toString().trim();
    const dateEnd = Stats.enddate.toString();
    const fecha = date.split(' ')[0];
    const horaIni = date.split(' ')[1];
    const horaFin = dateEnd.split(' ')[1];
    const duracion = obtainDuration(horaIni, horaFin);

    const datosInt = await SimData.find({ 'id_simulacrum': Stats.id });
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
    //res.render('intervention/stats', { Stats, fecha, duracion, labels, caidas, tempInt, tempExt, pulse, haycaida, avgTempInt, avgTempExt, avgPulso });
    res.render('simulacrum/stats', { Stats, fecha, duracion, labels, caidas, tempInt, tempExt, pulse, haycaida, avgTempInt, avgTempExt, avgPulso });
}


simulacrumCtrls.newSimulacrum = async (req, res) => {
    const date = new Date();
    const date_tosaved = date.getUTCDate() + '/' + (date.getUTCMonth() + 1) + '/' + date.getFullYear();
    const date_tosaveh = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    const date_def = date_tosaved + ' ' + date_tosaveh;
    const newSimulacrum = new Simulacrum({
        id_bombero: req.user.id,
        startdate: date_def
    });
    const int = await newSimulacrum.save();
    res.render('simulacrum/simulacrum');
}

simulacrumCtrls.finishSimulacrum = async (req, res) => {
    const simulacrums = await Simulacrum.find({ id_bombero: req.user.id });
    const id_toupdate = simulacrums[simulacrums.length - 1].id;
    const date = new Date();
    const date_tosaved = date.getUTCDate() + '/' + (date.getUTCMonth() + 1) + '/' + date.getFullYear();
    const date_tosaveh = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    const date_def = date_tosaved + ' ' + date_tosaveh;
    const int_toup = await Simulacrum.findByIdAndUpdate(id_toupdate, { 'enddate': date_def });
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

module.exports = simulacrumCtrls;