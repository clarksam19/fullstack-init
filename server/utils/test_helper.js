const Temp = require("../models/temp");
const User = require("../models/user");

const initialContents = [
  {
    content: "this is content",
  },
  {
    content: "This is more content",
  },
];

const nonExistingId = async () => {
  const content = new Temp({ content: "this is some new content" });
  await content.save();
  await content.remove();

  return content._id.toString();
};

const contentsInDb = async () => {
  const contents = await Temp.find({});
  return contents.map((content) => content.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialContents,
  nonExistingId,
  contentsInDb,
  usersInDb,
};
