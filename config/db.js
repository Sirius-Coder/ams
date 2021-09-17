const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      `The connection to the Database has been established succesfully to ${connection.connection.host}`
    );
  } catch (e) {
    console.error(e);
  }
};

module.exports = connectDB;
