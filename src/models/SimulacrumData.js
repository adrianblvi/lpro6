const { Schema, model } = require('mongoose');

const SimulacrumDataSchema = new Schema({

    id_bombero:
    {
        type: String,
        required: false
    },
    id_simulacrum:
    {
        type: String,
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
        type: String
    }


});

module.exports = model('SimulacrumData', SimulacrumDataSchema);