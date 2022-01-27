const db = require("../../services/db");
const faker = require("faker");
const UserModel = require("../user-model");
const { getRandomSequence } = require("../../utils");

function createSampleUser() {
  return {
    _id: getRandomSequence(28),
    email: faker.internet.email(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    url_avatar: faker.image.imageUrl(),
    description: getRandomSequence(100),
    birth_date: faker.date.past(18).toISOString().substring(0, 10),
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

  afterEach(async () => {
    await UserModel.deleteMany();
  });

  describe("1. ID", () => {
    test("1.1. ID is unique", async () => {
      expect.assertions(1);

      const uid = getRandomSequence(28);

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

      const uid = getRandomSequence(28);

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

  describe("3. Firstname", () => {
    test("3.1. Firstname is trimmed", async () => {
      expect.assertions(1);

      const firstname = faker.name.firstName();

      const user = {
        ...createSampleUser(),
        firstname: ` ${firstname} `,
      };

      const createdUser = await UserModel.create(user);

      expect(createdUser).toHaveProperty("firstname", firstname);
    });
    test("3.2. Firstname must not have more than 50 chars", async () => {
      expect.assertions(1);

      const firstname = getRandomSequence(100);

      const user = {
        ...createSampleUser(),
        firstname: firstname,
      };

      try {
        await UserModel.create(user);
      } catch (error) {
        expect(error.errors.firstname.properties.type).toBe("maxlength");
      }
    });
  });

  describe("4. Lastname", () => {
    test("4.1. Lastname is trimmed", async () => {
      expect.assertions(1);

      const lastname = faker.name.lastName();

      const user = {
        ...createSampleUser(),
        lastname: ` ${lastname} `,
      };

      const createdUser = await UserModel.create(user);

      expect(createdUser).toHaveProperty("lastname", lastname);
    });

    test("4.2. Lastname must not have more than 50 chars", async () => {
      expect.assertions(1);

      const lastname = getRandomSequence(100);

      const user = {
        ...createSampleUser(),
        lastname: lastname,
      };

      try {
        await UserModel.create(user);
      } catch (error) {
        expect(error.errors.lastname.properties.type).toBe("maxlength");
      }
    });
  });

  describe("5. Description", () => {
    test("5.1. Description is trimmed", async () => {
      expect.assertions(1);

      const description = getRandomSequence(100);

      const user = {
        ...createSampleUser(),
        description: ` ${description} `,
      };

      const createdUser = await UserModel.create(user);

      expect(createdUser).toHaveProperty("description", description);
    });
    test("5.2. Description must not have more than 250 chars", async () => {
      expect.assertions(1);

      const description = getRandomSequence(300);

      const user = {
        ...createSampleUser(),
        description: description,
      };

      try {
        await UserModel.create(user);
      } catch (error) {
        expect(error.errors.description.properties.type).toBe("maxlength");
      }
    });
  });

  describe("6. Birth date", () => {
    test("6.1. Birth date is trimmed", async () => {
      expect.assertions(1);

      const birth_date = "2000-01-01";

      const user = {
        ...createSampleUser(),
        birth_date: ` ${birth_date} `,
      };

      const createdUser = await UserModel.create(user);

      expect(createdUser).toHaveProperty("birth_date", birth_date);
    });

    test("6.2. Birth date must be with format 'YYYY-MM-DD' and valid", async () => {
      expect.assertions(1);

      const user = {
        ...createSampleUser(),
        birth_date: "1st January 2009",
      };

      try {
        await UserModel.create(user);
      } catch (error) {
        expect(error.errors.birth_date.properties.type).toBe("user defined");
      }
    });
  });

  describe("7. URL avatar", () => {
    test("7.1. URL avatar is trimmed", async () => {
      expect.assertions(1);

      const url_avatar = faker.image.imageUrl();

      const user = {
        ...createSampleUser(),
        url_avatar: ` ${url_avatar} `,
      };

      const createdUser = await UserModel.create(user);

      expect(createdUser).toHaveProperty("url_avatar", url_avatar);
    });

    test("7.2. URL must be valid", async () => {
      expect.assertions(1);

      const url_avatar = getRandomSequence(50);

      const user = {
        ...createSampleUser(),
        url_avatar: url_avatar,
      };
      try {
        await UserModel.create(user);
      } catch (error) {
        expect(error.errors.url_avatar.properties.type).toBe("user defined");
      }
    });
  });

  // describe("10. List of liked albums", () => {});

  // describe("11. List of liked tracks", () => {});

  // describe("12. List of followed playlists", () => {});

  // describe("13. List of followed users", () => {});

  // describe("14. List of followers", () => {});
});
