const jwt = require("jsonwebtoken");
const tempRouter = require("express").Router();
const Temp = require("../models/temp");
const User = require("../models/user");

tempRouter.get("/", async (req, res) => {
  const results = await Temp.find({}).populate("user", {
    username: 1,
    name: 1,
  });

  res.json(results.map((result) => result.toJSON()));
});

const getTokenFrom = (req) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

tempRouter.get("/:id", async (req, res) => {
  const result = await Temp.findById(req.params.id);
  if (result) {
    res.json(result);
  } else {
    res.status(404).end();
  }
});

tempRouter.post("/", async (req, res) => {
  const body = req.body;
  const token = getTokenFrom(req);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(decodedToken.id);

  const content = new Temp({
    content: body.content,
  });

  const savedContent = await content.save();

  user.contents = user.contents.concat(savedContent._id);
  await user.save();

  res.json(savedContent.toJSON());
});

tempRouter.delete("/:id", async (req, res) => {
  await Temp.findByIdAndRemove(req.params.id);
  res.status(204).end();
});

tempRouter.put("/:id", (req, res, next) => {
  const body = req.body;

  const content = new Temp({
    content: body.content,
  });

  Temp.findByIdAndUpdate(req.params.id, content, { new: true })
    .then((updatedContent) => {
      res.json(updatedContent.toJSON());
    })
    .catch((error) => next(error));
});

module.exports = tempRouter;
