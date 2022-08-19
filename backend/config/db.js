const mongoose = require('mongoose');

// connect to database
const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
    } catch (error) {
        console.log(`Error: ${error.message}`.red.bold);
        process.exit();
    }

};

module.exports = connectDb;