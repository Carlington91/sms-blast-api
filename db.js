const mongoose = require('mongoose');

const dbConnect = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI,
      {
        useNewUrlParser: true,
      },
      () => console.log('Database connected'),
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbConnect;
