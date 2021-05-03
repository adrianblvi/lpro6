const { Schema, model } = require('mongoose');

const SimulacrumSchema = new Schema({
    status:
    {
        type: String
    },
    date:
    {
        type: Date, default: Date.now
    }
});

module.exports = model('Simulacrum', SimulacrumSchema);