const mongoose = require('mongoose');

const db = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI,
      {
        dbName: process.env.MONGODB_DATABASE_NAME,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    console.log('Database got connected');
  } catch (e) {
    console.log(`Unable to connect to Database - ${e.message}`);
  }
};

module.exports = db;
