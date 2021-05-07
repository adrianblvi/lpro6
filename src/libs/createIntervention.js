const Intervention = require('../models/Intervention');

const createIntervention = async () => {

    const newIntervention = new Intervention({
        status: 'Inicio'
    });
    const date = Date.now().toString().substring(0, 15).trim();
    newIntervention.date = date;
    const int = await newIntervention.save();
    console.log('Inicio intervencion creada');
};

module.exports = { createIntervention };