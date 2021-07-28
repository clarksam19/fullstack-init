const router = require("express").Router();
const Temp = require("../models/temp");
const User = require("../models/user");

router.post("/reset", async (request, response) => {
  await Temp.deleteMany({});
  await User.deleteMany({});

  response.status(204).end();
});

module.exports = router;
