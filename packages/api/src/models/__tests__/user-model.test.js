const db = require("../../services/db");
const faker = require("faker");
const { Types } = require("mongoose");
const UserModel = require("../user-model");
const { getRandomSequence } = require("../../utils");
const { createSampleUser } = require("../../db/samplers");

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

      const user01 = { ...sample, _id: uid };
      const user02 = { ...sample, _id: uid };

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
        ...sample,
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

      const user01 = { ...sample, email: "foo@bar.com" };
      const user02 = { ...sample, email: "foo@bar.com" };

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
        ...sample,
        email: ` ${email} `,
      };

      const createdUser = await UserModel.create(user);

      expect(createdUser).toHaveProperty("email", email);
    });

    test("2.4. Email must be valid", async () => {
      expect.assertions(1);

      const user = {
        ...sample,
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
        ...sample,
        firstname: ` ${firstname} `,
      };

      const createdUser = await UserModel.create(user);

      expect(createdUser).toHaveProperty("firstname", firstname);
    });
    test("3.2. Firstname must not have more than 50 chars", async () => {
      expect.assertions(1);

      const firstname = getRandomSequence(51);

      const user = {
        ...sample,
        firstname,
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
        ...sample,
        lastname: ` ${lastname} `,
      };

      const createdUser = await UserModel.create(user);

      expect(createdUser).toHaveProperty("lastname", lastname);
    });

    test("4.2. Lastname must not have more than 50 chars", async () => {
      expect.assertions(1);

      const lastname = getRandomSequence(51);

      const user = {
        ...sample,
        lastname,
      };

      try {
        await UserModel.create(user);
      } catch (error) {
        expect(error.errors.lastname.properties.type).toBe("maxlength");
      }
    });
  });

  describe("5. Username", () => {
    test("5.1. Username is trimmed", async () => {
      expect.assertions(1);

      const username = faker.name.title();

      const user = {
        ...sample,
        username: ` ${username} `,
      };

      const createdUser = await UserModel.create(user);

      expect(createdUser).toHaveProperty("username", username);
    });

    test("5.2. Username must not have more than 50 chars", async () => {
      expect.assertions(1);

      const username = getRandomSequence(51);

      const user = {
        ...sample,
        username,
      };

      try {
        await UserModel.create(user);
      } catch (error) {
        expect(error.errors.username.properties.type).toBe("maxlength");
      }
    });
  });

  describe("6. Description", () => {
    test("6.1. Description is trimmed", async () => {
      expect.assertions(1);

      const description = getRandomSequence(250);

      const user = {
        ...sample,
        description: ` ${description} `,
      };

      const createdUser = await UserModel.create(user);

      expect(createdUser).toHaveProperty("description", description);
    });

    test("6.2. Description must not have more than 250 chars", async () => {
      expect.assertions(1);

      const description = getRandomSequence(251);

      const user = {
        ...sample,
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
        ...sample,
        birth_date: ` ${birth_date} `,
      };

      const createdUser = await UserModel.create(user);

      expect(createdUser).toHaveProperty("birth_date", birth_date);
    });

    test("6.2. Birth date must be with format 'YYYY-MM-DD' and valid", async () => {
      expect.assertions(1);

      const user = {
        ...sample,
        birth_date: "1st January 2009",
      };

      try {
        await UserModel.create(user);
      } catch (error) {
        expect(error.errors.birth_date.properties.type).toBe("user defined");
      }
    });
  });

  describe("8. Thumbnail (default)", () => {
    test("8.1. Thumbnail URL is trimmed", async () => {
      expect.assertions(1);

      const url = faker.image.imageUrl();

      const user = {
        ...sample,
        thumbnails: {
          ...sample.thumbnails,
          url_default: ` ${url} `,
        },
      };

      const createdUser = await UserModel.create(user);

      expect(createdUser).toHaveProperty("thumbnails.url_default", url);
    });

    test("8.2. Thumbnail URL must be valid", async () => {
      expect.assertions(1);

      const url = "foo";

      const user = {
        ...sample,
        thumbnails: {
          ...sample.thumbnails,
          url_default: url,
        },
      };

      try {
        await UserModel.create(user);
      } catch (error) {
        expect(error.errors["thumbnails.url_default"].properties.type).toBe(
          "user defined",
        );
      }
    });
  });

  describe("9. Thumbnail (medium)", () => {
    test("9.1. Thumbnail URL is trimmed", async () => {
      expect.assertions(1);

      const url = faker.image.imageUrl();

      const user = {
        ...sample,
        thumbnails: {
          ...sample.thumbnails,
          url_medium: ` ${url} `,
        },
      };

      const createdUser = await UserModel.create(user);

      expect(createdUser).toHaveProperty("thumbnails.url_medium", url);
    });

    test("9.2. Thumbnail URL must be valid", async () => {
      expect.assertions(1);

      const url = "foo";

      const user = {
        ...sample,
        thumbnails: {
          ...sample.thumbnails,
          url_medium: url,
        },
      };

      try {
        await UserModel.create(user);
      } catch (error) {
        expect(error.errors["thumbnails.url_medium"].properties.type).toBe(
          "user defined",
        );
      }
    });
  });

  describe("10. Thumbnail (large)", () => {
    test("10.1. Thumbnail URL is trimmed", async () => {
      expect.assertions(1);

      const url = faker.image.imageUrl();

      const user = {
        ...sample,
        thumbnails: {
          ...sample.thumbnails,
          url_large: ` ${url} `,
        },
      };

      const createdUser = await UserModel.create(user);

      expect(createdUser).toHaveProperty("thumbnails.url_large", url);
    });

    test("10.2. Thumbnail URL must be valid", async () => {
      expect.assertions(1);

      const url = "foo";

      const user = {
        ...sample,
        thumbnails: {
          ...sample.thumbnails,
          url_large: url,
        },
      };

      try {
        await UserModel.create(user);
      } catch (error) {
        expect(error.errors["thumbnails.url_large"].properties.type).toBe(
          "user defined",
        );
      }
    });
  });

  describe("11. Liked albums", () => {
    test("11.1. Liked albums must be an array of ObjectId", async () => {
      expect.assertions(3);

      const idAlbum = new Types.ObjectId().toString();

      const validUser01 = {
        ...createSampleUser(),
        liked_albums: [idAlbum],
      };

      const validUser02 = {
        ...createSampleUser(),
        liked_albums: idAlbum,
      };

      const invalidUser = {
        ...createSampleUser(),
        liked_albums: ["foo"],
      };

      await UserModel.create(validUser01).then((createdUser) => {
        expect(createdUser.liked_albums[0].toString()).toBe(idAlbum);
      });

      await UserModel.create(validUser02).then((createdUser) => {
        expect(createdUser.liked_albums[0].toString()).toBe(idAlbum);
      });

      await UserModel.create(invalidUser).catch((error) => {
        expect(error.errors["liked_albums.0"].kind).toBe("[ObjectId]");
      });
    });
  });

  describe("12. Liked tracks", () => {
    test("12.1. Liked tracks must be an array of ObjectId", async () => {
      expect.assertions(3);

      const idTrack = new Types.ObjectId().toString();

      const validUser01 = {
        ...createSampleUser(),
        liked_tracks: [idTrack],
      };

      const validUser02 = {
        ...createSampleUser(),
        liked_tracks: idTrack,
      };

      const invalidUser = {
        ...createSampleUser(),
        liked_tracks: ["foo"],
      };

      await UserModel.create(validUser01).then((createdUser) => {
        expect(createdUser.liked_tracks[0].toString()).toBe(idTrack);
      });

      await UserModel.create(validUser02).then((createdUser) => {
        expect(createdUser.liked_tracks[0].toString()).toBe(idTrack);
      });

      await UserModel.create(invalidUser).catch((error) => {
        expect(error.errors["liked_tracks.0"].kind).toBe("[ObjectId]");
      });
    });
  });

  describe("13. Followed playlists", () => {
    test("13.1. Followed playlists must be an array of ObjectId", async () => {
      expect.assertions(3);

      const idPlaylist = new Types.ObjectId().toString();

      const validUser01 = {
        ...createSampleUser(),
        followed_playlists: [idPlaylist],
      };

      const validUser02 = {
        ...createSampleUser(),
        followed_playlists: idPlaylist,
      };

      const invalidUser = {
        ...createSampleUser(),
        followed_playlists: ["foo"],
      };

      await UserModel.create(validUser01).then((createdUser) => {
        expect(createdUser.followed_playlists[0].toString()).toBe(idPlaylist);
      });

      await UserModel.create(validUser02).then((createdUser) => {
        expect(createdUser.followed_playlists[0].toString()).toBe(idPlaylist);
      });

      await UserModel.create(invalidUser).catch((error) => {
        expect(error.errors["followed_playlists.0"].kind).toBe("[ObjectId]");
      });
    });
  });

  describe("14. Followed users", () => {
    test("14.1. Followed users must be an array of String", async () => {
      expect.assertions(2);

      const idUser = getRandomSequence(28);

      const validUser01 = {
        ...createSampleUser(),
        followed_users: [idUser],
      };

      const validUser02 = {
        ...createSampleUser(),
        followed_users: idUser,
      };

      await UserModel.create(validUser01).then((createdUser) => {
        expect(createdUser.followed_users[0].toString()).toBe(idUser);
      });

      await UserModel.create(validUser02).then((createdUser) => {
        expect(createdUser.followed_users[0].toString()).toBe(idUser);
      });
    });
  });

  describe("15. followers", () => {
    test("15.1. Followers must be an array of String", async () => {
      expect.assertions(2);

      const idUser = getRandomSequence(28);

      const validUser01 = {
        ...createSampleUser(),
        followers: [idUser],
      };

      const validUser02 = {
        ...createSampleUser(),
        followers: idUser,
      };

      await UserModel.create(validUser01).then((createdUser) => {
        expect(createdUser.followers[0].toString()).toBe(idUser);
      });

      await UserModel.create(validUser02).then((createdUser) => {
        expect(createdUser.followers[0].toString()).toBe(idUser);
      });
    });
  });

  describe("16. Number of liked albums", () => {
    test("16.1. Value depends on the length of the 'liked_albums' array", async () => {
      expect.assertions(1);

      const length = 2;

      const user = {
        ...sample,
        liked_albums: Array.from({ length }, () =>
          new Types.ObjectId().toString(),
        ),
      };

      const createdUser = await UserModel.create(user);

      expect(createdUser).toHaveProperty("num_liked_albums", length);
    });

    test("16.2. Value is readonly / cannot be overwritten (virtual)", async () => {
      expect.assertions(1);

      const user = {
        ...sample,
        num_liked_albums: 1000,
      };

      const createdUser = await UserModel.create(user);

      expect(createdUser).toHaveProperty(
        "num_liked_albums",
        createdUser.liked_albums.length,
      );
    });
  });

  describe("17. Number of liked tracks", () => {
    test("17.1. Value depends on the length of the 'liked_tracks' array", async () => {
      expect.assertions(1);

      const length = 2;

      const user = {
        ...sample,
        liked_tracks: Array.from({ length }, () =>
          new Types.ObjectId().toString(),
        ),
      };

      const createdUser = await UserModel.create(user);

      expect(createdUser).toHaveProperty("num_liked_tracks", length);
    });

    test("17.2. Value is readonly / cannot be overwritten (virtual)", async () => {
      expect.assertions(1);

      const user = {
        ...sample,
        num_liked_tracks: 1000,
      };

      const createdUser = await UserModel.create(user);

      expect(createdUser).toHaveProperty(
        "num_liked_tracks",
        createdUser.liked_tracks.length,
      );
    });
  });

  describe("18. Number of followed playlists", () => {
    test("18.1. Value depends on the length of the 'followed_playlists' array", async () => {
      expect.assertions(1);

      const length = 2;

      const user = {
        ...sample,
        followed_playlists: Array.from({ length }, () =>
          new Types.ObjectId().toString(),
        ),
      };

      const createdUser = await UserModel.create(user);

      expect(createdUser).toHaveProperty("num_followed_playlists", length);
    });

    test("18.2. Value is readonly / cannot be overwritten (virtual)", async () => {
      expect.assertions(1);

      const user = {
        ...sample,
        num_followed_playlists: 1000,
      };

      const createdUser = await UserModel.create(user);

      expect(createdUser).toHaveProperty(
        "num_followed_playlists",
        createdUser.followed_playlists.length,
      );
    });
  });

  describe("19. Number of followed users", () => {
    test("19.1. Value depends on the length of the 'followed_users' array", async () => {
      expect.assertions(1);

      const length = 2;

      const user = {
        ...sample,
        followed_users: Array.from({ length }, () => getRandomSequence(28)),
      };

      const createdUser = await UserModel.create(user);

      expect(createdUser).toHaveProperty("num_followed_users", length);
    });

    test("19.2. Value is readonly / cannot be overwritten (virtual)", async () => {
      expect.assertions(1);

      const user = {
        ...sample,
        num_followed_users: 1000,
      };

      const createdUser = await UserModel.create(user);

      expect(createdUser).toHaveProperty(
        "num_followed_users",
        createdUser.followed_users.length,
      );
    });
  });

  describe("20. Number of followers", () => {
    test("20.1. Value depends on the length of the 'followers' array", async () => {
      expect.assertions(1);

      const length = 2;

      const user = {
        ...sample,
        followers: Array.from({ length }, () => getRandomSequence(28)),
      };

      const createdUser = await UserModel.create(user);

      expect(createdUser).toHaveProperty("num_followers", length);
    });

    test("20.2. Value is readonly / cannot be overwritten (virtual)", async () => {
      expect.assertions(1);

      const user = {
        ...sample,
        num_followers: 1000,
      };

      const createdUser = await UserModel.create(user);

      expect(createdUser).toHaveProperty(
        "num_followers",
        createdUser.followers.length,
      );
    });
  });
});
