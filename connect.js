const mongoose = require('mongoose');

async function connectDB(url) {
    return mongoose.connect(url).then(() => {
        console.log('Database connected successfully');
    }).catch(err => {        console.error('Database connection error:', err);
        throw err;
    });
}

module.exports = {connectDB};