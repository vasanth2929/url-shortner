const mongoose = require("mongoose");

async function connectDatabase() {
  try {
    await mongoose.connect("mongodb://localhost:27017/ta_shop", {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to database");
  } catch (error) {
    console.log("Database Connection Failed");
    process.exit(1);
  }
}

module.exports = { connectDatabase };
