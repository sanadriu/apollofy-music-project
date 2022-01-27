const db = require("../../services/db");
const UserModel = require("../user-model");

describe("user-schema", () => {
  beforeAll(async () => {
    await db.start();
    await db.connect();
  });

  afterAll(async () => {
    await db.disconnect();
    await db.stop();
  });

  const sample = {
    _id: "",
    email: "",
    firstname: "",
    lastname: "",
    url_image: "",
    url_thumbnail: "",
  };

  describe("1. ID", () => {
    test("1.1. ID is required", async () => {});
  });
});
