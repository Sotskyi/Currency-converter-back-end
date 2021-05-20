const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(
      (module.exports.mongoKey =
        "mongodb+srv://andrew71241:71241@cluster0-qvxpn.mongodb.net/app?retryWrites=true&w=majority"),
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    );
  } catch (e) {
    console.log("server Error", e.message);
    process.exit(1);
  }
}
module.exports = connectDB;
