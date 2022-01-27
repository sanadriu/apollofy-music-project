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
    test("1.2. ID is unique", async () => {});
    test("1.3. ID is trimmed", async () => {});
  });

  describe("2. Email", () => {
    test("2.1. Email is required", async () => {});
    test("2.2. Email is unique", async () => {});
    test("2.3. Email is trimmed", async () => {});
    test("2.4. Email must be valid", async () => {});
  });

  describe("3. Firstname", () => {
    test("3.1. Firstname is trimmed", async () => {});
  });

  describe("4. Lastname", () => {
    test("4.1. Lastname is trimmed", async () => {});
  });

  describe("5. URL avatar", () => {
    test("5.1. URL avatar is trimmed", async () => {});
    test("5.1. URL must be valid", async () => {});
  });

  // describe("10. List of liked albums", () => {});

  // describe("11. List of liked tracks", () => {});

  // describe("12. List of followed playlists", () => {});

  // describe("13. List of followed users", () => {});

  // describe("14. List of followers", () => {});
});
