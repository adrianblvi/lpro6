const { Schema, model } = require('mongoose');


const InterventionDataSchema = new Schema({
    id_bombero:
    {
        type: ObjectId,
        required: false
    },
    id_intervention:
    {
        type: ObjectId,
        required: false
    },
    pulso:
    {
        type: Number,
        required: false
    },
    temp_int:
    {
        type: Number,
        required: false
    },
    temp_ext:
    {
        type: Number,
        required: false
    },
    caida:
    {
        type: Boolean,
        required: false,
        default: false
    },
    date:
    {
        type: Date, default: Date.now
    }

});


module.exports = model('InterventionData', InterventionDataSchema)