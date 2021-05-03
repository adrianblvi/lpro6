const Intervention = require('../models/Internvention');

const createIntervention = async () => {

    const newIntervention = new Intervention({
        status: 'Inicio'
    });

    const int = await newIntervention.save();
    console.log('Inicio intervencion creada');
};

module.exports = { createIntervention };