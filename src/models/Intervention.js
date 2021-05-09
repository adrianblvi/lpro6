const { Schema, model } = require('mongoose');


const InterventionSchema = new Schema({

    id_bombero:
    {
        type: String,
        required: false
    },
    startdate:
    {
        type: String,
        required: false
    },
    enddate:
    {
        type: String,
        required: false
    }

});

module.exports = model('Intervention', InterventionSchema);