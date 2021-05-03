const { Schema, model } = require('mongoose');

const TrainingDataSchema = new Schema({

    id_bombero:
    {
        type: ObjectId,
        required: false
    },
    id_training:
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

module.exports = model('TrainingData', TrainingDataSchema);