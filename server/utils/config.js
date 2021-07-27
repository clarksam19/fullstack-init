import { config } from "dotenv";
config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

export default {
  MONGODB_URI,
  PORT,
};
