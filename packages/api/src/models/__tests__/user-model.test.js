const db = require("../../services/db");
const faker = require("faker");
const UserModel = require("../user-model");
const { generateRandomSequence } = require("../../utils");

function createSampleUser() {
  return {
    _id: generateRandomSequence(28),
    email: faker.internet.email(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    url_avatar: faker.image.imageUrl(),
  };
}

describe("user-schema", () => {
  const sample = createSampleUser();

  beforeAll(async () => {
    await db.start();
    await db.connect();
  });

  afterAll(async () => {
    await db.disconnect();
    await db.stop();
  });

  describe("1. ID", () => {
    test("1.1. ID is unique", async () => {
      expect.assertions(1);

      const uid = generateRandomSequence(28);

      const user01 = { ...createSampleUser(), _id: uid };
      const user02 = { ...createSampleUser(), _id: uid };

      try {
        await UserModel.create(user01);
        await UserModel.create(user02);
      } catch (error) {
        expect(error.code).toBe(11000);
      }
    });

    test("1.2. ID is trimmed", async () => {
      expect.assertions(1);

      const uid = generateRandomSequence(28);

      const user = {
        ...createSampleUser(),
        _id: ` ${uid} `,
      };

      const createdUser = await UserModel.create(user);

      expect(createdUser).toHaveProperty("_id", uid);
    });
  });

  describe("2. Email", () => {
    test("2.1. Email is required", async () => {
      expect.assertions(1);

      const { email, ...user } = sample;

      try {
        await UserModel.create(user);
      } catch (error) {
        expect(error.errors.email.properties.type).toBe("required");
      }
    });

    test("2.2. Email is unique", async () => {
      expect.assertions(1);

      const user01 = { ...createSampleUser(), email: "foo@bar.com" };
      const user02 = { ...createSampleUser(), email: "foo@bar.com" };

      try {
        await UserModel.create(user01);
        await UserModel.create(user02);
      } catch (error) {
        expect(error.code).toBe(11000);
      }
    });

    test("2.3. Email is trimmed", async () => {
      expect.assertions(1);

      const email = faker.internet.email();

      const user = {
        ...createSampleUser(),
        email: ` ${email} `,
      };

      const createdUser = await UserModel.create(user);

      expect(createdUser).toHaveProperty("email", email);
    });

    test("2.4. Email must be valid", async () => {
      expect.assertions(1);

      const user = {
        ...createSampleUser(),
        email: "bad-email",
      };

      try {
        await UserModel.create(user);
      } catch (error) {
        expect(error.errors.email.properties.type).toBe("user defined");
      }
    });
  });

  // describe("3. Firstname", () => {
  //   test("3.1. Firstname is trimmed", async () => {});
  //   test("3.2. Firstname must not have more than 50 chars", async () => {});
  // });

  // describe("4. Lastname", () => {
  //   test("4.1. Lastname is trimmed", async () => {});
  //   test("4.2. Lastname must not have more than 50 chars", async () => {});
  // });

  // describe("5. Description", () => {
  //   test("5.1. Description is trimmed", async () => {});
  //   test("5.2. Description must not have more than 250 chars", async () => {});
  // });

  // describe("7. URL avatar", () => {
  //   test("7.1. URL avatar is trimmed", async () => {});
  //   test("7.1. URL must be valid", async () => {});
  // });

  // describe("10. List of liked albums", () => {});

  // describe("11. List of liked tracks", () => {});

  // describe("12. List of followed playlists", () => {});

  // describe("13. List of followed users", () => {});

  // describe("14. List of followers", () => {});
});
