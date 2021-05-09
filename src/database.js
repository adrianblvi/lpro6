const mongoose = require('mongoose');

const { FIREHEALTH_HOST, FIREHEALTH_DB } = process.env;

const MONGODB_URI = `mongodb://${FIREHEALTH_HOST}/${FIREHEALTH_DB}`;

mongoose.connect(MONGODB_URI, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
    .then(() => console.log('Database connected'))
    .catch(err => console.log(err));