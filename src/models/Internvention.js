const { Schema, model } = require('mongoose');


const InterventionSchema = new Schema({

    status:
    {
        type: String
    },
    date:
    {
        type: Date, default: Date.now
    }
});

module.exports = model('Intervention', InterventionSchema);