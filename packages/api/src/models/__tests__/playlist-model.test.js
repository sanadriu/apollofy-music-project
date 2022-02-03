const db = require("../../services/db");
const faker = require("faker");
const { Types } = require("mongoose");
const PlaylistModel = require("../playlist-model");
const { getRandomSequence } = require("../../utils");
const { createSamplePlaylist } = require("../../db/samplers");
const { seedUserCollection } = require("../../db/collections");

describe("playlist-schema", () => {
  let sample;
  let users;

  beforeAll(async () => {
    await db.start();
    await db.connect();

    users = await seedUserCollection();
    sample = createSamplePlaylist(users);
  });

  afterAll(async () => {
    await db.disconnect();
    await db.stop();
  });

  afterEach(async () => {
    await PlaylistModel.deleteMany();
  });

  describe("1. User ID", () => {
    test("1.1. User ID is required", async () => {
      expect.assertions(1);

      const { user, ...playlist } = sample;

      try {
        await PlaylistModel.create(playlist);
      } catch (error) {
        expect(error.errors.user.properties.type).toBe("required");
      }
    });

    test("1.2. User ID is trimmed", async () => {
      expect.assertions(1);

      const user = getRandomSequence(28);

      const playlist = {
        ...sample,
        user: ` ${user} `,
      };

      const createdPlaylist = await PlaylistModel.create(playlist);

      expect(createdPlaylist).toHaveProperty("user", user);
    });
  });

  describe("2. Title", () => {
    test("2.1. Title is required", async () => {
      expect.assertions(1);

      const { title, ...playlist } = sample;

      try {
        await PlaylistModel.create(playlist);
      } catch (error) {
        expect(error.errors.title.properties.type).toBe("required");
      }
    });

    test("2.2. Title is trimmed", async () => {
      expect.assertions(1);

      const title = faker.name.title();

      const playlist = {
        ...sample,
        title: ` ${title} `,
      };

      const createdPlaylist = await PlaylistModel.create(playlist);

      expect(createdPlaylist).toHaveProperty("title", title);
    });
  });

  describe("3. Description", () => {
    test("3.1. Description is trimmed", async () => {
      expect.assertions(1);

      const description = getRandomSequence(250);

      const playlist = {
        ...sample,
        description: ` ${description} `,
      };

      const createdPlaylist = await PlaylistModel.create(playlist);

      expect(createdPlaylist).toHaveProperty("description", description);
    });
  });

  describe("4. Color", () => {
    test("4.1. Color is trimmed", async () => {
      expect.assertions(1);

      const color = faker.commerce.color();

      const playlist = {
        ...sample,
        color: ` ${color} `,
      };

      const createdPlaylist = await PlaylistModel.create(playlist);

      expect(createdPlaylist).toHaveProperty("color", color);
    });
  });

  describe("5. Tracks", () => {
    test("5.1. Tracks must be an array of ObjectId", async () => {
      expect.assertions(3);

      const idTrack = new Types.ObjectId().toString();

      const validPlaylist01 = {
        ...sample,
        tracks: [idTrack],
      };

      const validPlaylist02 = {
        ...sample,
        tracks: idTrack,
      };

      const invalidPlaylist = {
        ...sample,
        tracks: ["foo"],
      };

      await PlaylistModel.create(validPlaylist01).then((createdPlaylist) => {
        expect(createdPlaylist.tracks[0].toString()).toBe(idTrack);
      });

      await PlaylistModel.create(validPlaylist02).then((createdPlaylist) => {
        expect(createdPlaylist.tracks[0].toString()).toBe(idTrack);
      });

      await PlaylistModel.create(invalidPlaylist).catch((error) => {
        expect(error.errors["tracks.0"].kind).toBe("[ObjectId]");
      });
    });
  });

  describe("6. Followed by", () => {
    test("6.1. Followed by must be an array of String", async () => {
      expect.assertions(2);

      const idUser = getRandomSequence(28);

      const validPlaylist01 = {
        ...sample,
        followed_by: [idUser],
      };

      const validPlaylist02 = {
        ...sample,
        followed_by: idUser,
      };

      await PlaylistModel.create(validPlaylist01).then((createdPlaylist) => {
        expect(createdPlaylist.followed_by[0]).toBe(idUser);
      });

      await PlaylistModel.create(validPlaylist02).then((createdPlaylist) => {
        expect(createdPlaylist.followed_by[0]).toBe(idUser);
      });
    });
  });

  describe("7. Thumbnail (default)", () => {
    test("7.1. Thumbnail URL is trimmed", async () => {
      expect.assertions(1);

      const url = faker.image.imageUrl();

      const playlist = {
        ...sample,
        thumbnails: {
          ...sample.thumbnails,
          url_default: ` ${url} `,
        },
      };

      const createdPlaylist = await PlaylistModel.create(playlist);

      expect(createdPlaylist).toHaveProperty("thumbnails.url_default", url);
    });

    test("7.2. Thumbnail URL must be valid", async () => {
      expect.assertions(1);

      const url = "foo";

      const playlist = {
        ...sample,
        thumbnails: {
          ...sample.thumbnails,
          url_default: url,
        },
      };

      try {
        await PlaylistModel.create(playlist);
      } catch (error) {
        expect(error.errors["thumbnails.url_default"].properties.type).toBe("user defined");
      }
    });
  });

  describe("8. Thumbnail (medium)", () => {
    test("8.1. Thumbnail URL is trimmed", async () => {
      expect.assertions(1);

      const url = faker.image.imageUrl();

      const playlist = {
        ...sample,
        thumbnails: {
          ...sample.thumbnails,
          url_medium: ` ${url} `,
        },
      };

      const createdPlaylist = await PlaylistModel.create(playlist);

      expect(createdPlaylist).toHaveProperty("thumbnails.url_medium", url);
    });

    test("8.2. Thumbnail URL must be valid", async () => {
      expect.assertions(1);

      const url = "foo";

      const playlist = {
        ...sample,
        thumbnails: {
          ...sample.thumbnails,
          url_medium: url,
        },
      };

      try {
        await PlaylistModel.create(playlist);
      } catch (error) {
        expect(error.errors["thumbnails.url_medium"].properties.type).toBe("user defined");
      }
    });
  });

  describe("9. Thumbnail (large)", () => {
    test("9.1. Thumbnail URL is trimmed", async () => {
      expect.assertions(1);

      const url = faker.image.imageUrl();

      const playlist = {
        ...sample,
        thumbnails: {
          ...sample.thumbnails,
          url_large: ` ${url} `,
        },
      };

      const createdPlaylist = await PlaylistModel.create(playlist);

      expect(createdPlaylist).toHaveProperty("thumbnails.url_large", url);
    });

    test("9.2. Thumbnail URL must be valid", async () => {
      expect.assertions(1);

      const url = "foo";

      const playlist = {
        ...sample,
        thumbnails: {
          ...sample.thumbnails,
          url_large: url,
        },
      };

      try {
        await PlaylistModel.create(playlist);
      } catch (error) {
        expect(error.errors["thumbnails.url_large"].properties.type).toBe("user defined");
      }
    });
  });

  describe("10. Number of followers", () => {
    test("10.1. Value depends on the length of the 'followed_by' array", async () => {
      expect.assertions(1);

      const length = 2;

      const playlist = {
        ...sample,
        followed_by: Array.from({ length }, () => getRandomSequence(28)),
      };

      const createdPlaylist = await PlaylistModel.create(playlist);

      expect(createdPlaylist).toHaveProperty("num_followers", length);
    });

    test("10.2. Value is readonly / cannot be overwritten (virtual)", async () => {
      expect.assertions(1);

      const playlist = {
        ...sample,
        num_followers: 1000,
      };

      const createdPlaylist = await PlaylistModel.create(playlist);

      expect(createdPlaylist).toHaveProperty("num_followers", createdPlaylist.followed_by.length);
    });
  });

  describe("11. Number of tracks", () => {
    test("11.1. Value depends on the length of the 'tracks' array", async () => {
      expect.assertions(1);

      const length = 2;

      const playlist = {
        ...sample,
        tracks: Array.from({ length }, () => new Types.ObjectId().toString()),
      };

      const createdPlaylist = await PlaylistModel.create(playlist);

      expect(createdPlaylist).toHaveProperty("num_tracks", length);
    });

    test("11.2. Value is readonly / cannot be overwritten (virtual)", async () => {
      expect.assertions(1);

      const playlist = {
        ...sample,
        num_tracks: 1000,
      };

      const createdPlaylist = await PlaylistModel.create(playlist);

      expect(createdPlaylist).toHaveProperty("num_tracks", createdPlaylist.tracks.length);
    });
  });
});
