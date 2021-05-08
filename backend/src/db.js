const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      autoIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log(`DB connected  : ${connect.connection.host}`);
  } catch (e) {
    console.log(e);
  }
};

module.exports = connectDB;
