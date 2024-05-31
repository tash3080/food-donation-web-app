const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const db = "mongodb+srv://tash3080:3tubXQHCmtOmcly0@cluster0.lifqhhb.mongodb.net/expressDatabase";
    // const db = "mongodb://localhost:27017";
    await mongoose.connect(db);
    console.log("Cloud MongoDB Cluster connected...");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
