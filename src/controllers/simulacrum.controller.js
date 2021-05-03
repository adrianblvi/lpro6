const simulacrumCtrls = {}

const Simulacrum = require('../models/Simulacrum');

simulacrumCtrls.renderSimList = async (req, res) => {
    const simulacrums = await Simulacrum.find();
    res.render('simulacrum/list', { simulacrums });
}

module.exports = simulacrumCtrls;