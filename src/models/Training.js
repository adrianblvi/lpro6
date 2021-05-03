const { Schema, model } = require('mongoose');

const TrainingSchema = new Schema({
    status:
    {
        type: String
    },
    date:
    {
        type: Date, default: Date.now
    }
});

module.exports = model('Training', TrainingSchema);