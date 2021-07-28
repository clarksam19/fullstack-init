const config = require("./utils/config");
const express = require("express");
const app = express();
require("express-async-errors");
// const morgan = require("morgan");
const cors = require("cors");
// const path = require("path");
const middleware = require("./utils/middleware");
const tempRouter = require("./controllers/temps");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const { logInfo, logError } = require("./utils/logger");
const mongoose = require("mongoose");

logInfo("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    logInfo("connected to MongoDB");
  })
  .catch((error) => {
    logError("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/temp", tempRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

// const data = [];
// const promises = [];

// for (let index = 1; index < 50; index++) {
//   const promise = axios.post("/", (res) => {
//     res.json(res.body);
//   });

//   promises.push(promise);
// }

// Promise.all(promises, (results) => {
//   results.forEach((result) => {
//     data.push(result);
//   });
// });

// logInfo(JSON.stringify(data));
module.exports = app;
