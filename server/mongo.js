const mongoose = require("mongoose");
const { logInfo, logError } = require("./utils/logger");


const url = 'mongodb://rootdev:passdev@db-dev:27017?authSource=admin'
const connect = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    logInfo("connected to MongoDB");
  } catch (error) {
    logError("error connecting to MongoDB:", error.message);
  }
  
  mongoose.connection.close();
}

connect();
