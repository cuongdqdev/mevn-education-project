const mongoose              = require('mongoose');
const { MONGODB_URL }       = require('../config')

module.exports.connectDatabase = () => {
    mongoose.connect(MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    mongoose.connection.once('open', () => console.log(`MongoDB is running.`));
}
