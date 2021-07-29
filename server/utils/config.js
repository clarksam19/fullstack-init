require("dotenv").config();

const PORT = process.env.PORT || 3001;
let MONGODB_URI;
switch (process.env.NODE_ENV) {
  case "test":
    MONGODB_URI = process.env.TEST_MONGODB_URI;
    break;
  case "production":
    MONGODB_URI = process.env.PROD_MONGODB_URI;
    break;
  default:
    MONGODB_URI = process.env.DEV_MONGODB_URI;
}

module.exports = {
  MONGODB_URI,
  PORT,
};
