const { Schema, model } = require('mongoose');

const TrainingSchema = new Schema({
   
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

module.exports = model('Training', TrainingSchema);