const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

async function connectMongoDB(url) {
    if(!url) throw new Error("MongoDB connection url is required");

    return mongoose.connect(url);
}

module.exports = {
    connectMongoDB
}