const { Schema, model } = require('mongoose');


const InterventionSchema = new Schema({

    id_bombero:
    {
        type: String,
        required: false
    },
    startdate:
    {
        type: Date, default: Date.now
    },
    enddate:
    {
        type: Date, default: Date.now
    }

});

module.exports = model('Intervention', InterventionSchema);