const tempRouter = require("express").Router();
const Temp = require("../models/temp");

tempRouter.get("/", (req, res) => {
  Temp.find({}).then((temps) => {
    res.json(temps);
  });
});

tempRouter.get("/:id", (req, res, next) => {
  Temp.findById(req.params.id)
    .then((temp) => {
      if (temp) {
        res.json(temp);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

tempRouter.post("/", (req, res, next) => {
  const body = req.body;

  const temp = new Temp({
    content: body.content,
  });

  temp
    .save()
    .then((savedTemp) => {
      res.json(savedTemp);
    })
    .catch((error) => next(error));
});

tempRouter.delete("/:id", (req, res, next) => {
  Temp.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

tempRouter.put("/:id", (req, res, next) => {
  const body = req.body;

  const temp = new Temp({
    content: body.content,
  });

  Temp.findByIdAndUpdate(req.params.id, temp, { new: true })
    .then((updatedTemp) => {
      res.json(updatedTemp);
    })
    .catch((error) => next(error));
});

module.exports = tempRouter;
