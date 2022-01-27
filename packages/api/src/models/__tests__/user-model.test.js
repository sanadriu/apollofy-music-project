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
    url_avatar: "",
  };

  describe("1. ID", () => {
    test("1.1. ID is required", async () => {});
  });

  describe("2. Email", () => {});

  describe("3. Firstname", () => {});

  describe("4. Lastname", () => {});

  describe("5. URL avatar", () => {});

  describe("10. List of liked albums", () => {});

  describe("11. List of liked tracks", () => {});

  describe("12. List of followed playlists", () => {});

  describe("13. List of followed users", () => {});

  describe("14. List of followers", () => {});
});
