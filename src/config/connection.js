const mongoose = require('mongoose');

require('dotenv').config();

const urlDb = process.env.MONGO_URL;

const connection = mongoose.connect(urlDb).then(() => {
    console.log('DB connection sucessful');
}).catch((error) => {
    console.log('Error DB connection', error);
});

module.exports = connection;