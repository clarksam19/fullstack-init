const supertest = require("supertest");
const mongoose = require("mongoose");
const helper = require("../utils/test_helper");
const app = require("../app");
const api = supertest(app);
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Temp = require("../models/temp");

describe("when there is initially some content saved", () => {
  beforeEach(async () => {
    await Temp.deleteMany({});
    await Temp.insertMany(helper.initialContents);
  });
  test("contents are returned as json", async () => {
    await api
      .get("/api/temp")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all contents are returned", async () => {
    const response = await api.get("/api/temp");

    expect(response.body).toHaveLength(helper.initialContents.length);
  });

  test("a specific entry is within the returned contents", async () => {
    const response = await api.get("/api/temp");

    const contents = response.body.map((r) => r.content);
    expect(contents).toContain("this is content");
  });

  describe("viewing a specific entry", () => {
    test("succeeds with a valid id", async () => {
      const contentsAtStart = await helper.contentsInDb();

      const contentToView = contentsAtStart[0];

      const resultContent = await api
        .get(`/api/temp/${contentToView.id}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      const processedContentToView = JSON.parse(JSON.stringify(contentToView));

      expect(resultContent.body).toEqual(processedContentToView);
    });

    test("fails with statuscode 404 if entry does not exist", async () => {
      const validNonexistingId = await helper.nonExistingId();

      await api.get(`/api/temp/${validNonexistingId}`).expect(404);
    });

    test("fails with statuscode 400 id is invalid", async () => {
      const invalidId = "5a3d5da59070081a82a3445";

      await api.get(`/api/temp/${invalidId}`).expect(400);
    });
  });

  describe("addition of a new entry", () => {
    let token;
    test("create new user and login", async () => {
      const user = await api
        .post("/api/users")
        .send({ username: "test", password: "testing" })
        .expect(200);

      const login = await api
        .post("/api/login")
        .send({ username: "test", password: "testing" })
        .expect(200);

      token = login.body.token;
    });
    test("succeeds with valid data", async () => {
      const newContent = {
        content: "this is even more content",
      };

      const post = await api
        .post("/api/temp")
        .set("Authorization", "bearer " + token)
        .send(newContent)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      const contentsAtEnd = await helper.contentsInDb();
      expect(contentsAtEnd).toHaveLength(helper.initialContents.length + 1);

      const contents = contentsAtEnd.map((n) => n.content);
      expect(contents).toContain("this is even more content");
    });

    test("fails with status code 400 if data invalid", async () => {
      const newContent = {
        name: "invalid",
      };

      await api
        .post("/api/temp")
        .set("Authorization", "bearer " + token)
        .send(newContent)
        .expect(400);

      const contentsAtEnd = await helper.contentsInDb();

      expect(contentsAtEnd).toHaveLength(helper.initialContents.length);
    });
  });

  describe("deletion of an entry", () => {
    test("succeeds with status code 204 if id is valid", async () => {
      const contentsAtStart = await helper.contentsInDb();
      const contentToDelete = contentsAtStart[0];

      await api.delete(`/api/temp/${contentToDelete.id}`).expect(204);

      const contentsAtEnd = await helper.contentsInDb();

      expect(contentsAtEnd).toHaveLength(helper.initialContents.length - 1);

      const contents = contentsAtEnd.map((res) => res.content);

      expect(contents).not.toContain(contentToDelete.content);
    });
  });
});

describe("when there is initially one user at db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("secret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "txranger",
      name: "Chuck Norris",
      password: "roundhouse",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((user) => user.username);
    expect(usernames).toContain(newUser.username);
  });

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "Duplicate",
      password: "shouldthrowerror",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("`username` to be unique");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(async () => {
  await User.deleteMany({});
  mongoose.connection.close();
});
