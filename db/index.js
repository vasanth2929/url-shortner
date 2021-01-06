const mongoose = require("mongoose");

async function connectDatabase() {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.a6hq7.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to database");
  } catch (error) {
    console.log("Database Connection Failed:"+error.message);
    process.exit(1);
  }
}

module.exports = { connectDatabase };
