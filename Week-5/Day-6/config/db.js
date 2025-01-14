const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`DB Connected ${conn.connection.host}`.cyan.underline.bold);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDb;
