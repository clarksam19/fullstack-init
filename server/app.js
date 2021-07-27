const config = require("./utils/config");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const middleware = require("./utils/middleware");
const { logInfo, logError } = require("./utils/logger");
const mongoose = require("mongoose");

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/temp", tempRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;