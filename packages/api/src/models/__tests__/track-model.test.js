const db = require("../../services/db");
const faker = require("faker");
const { Types } = require("mongoose");
const TrackModel = require("../track-model");
const { getRandomSequence } = require("../../utils");
const { createSampleTrack } = require("../../db/samplers");
const { seedUserCollection, seedGenreCollection } = require("../../db/collections");

describe("track-schema", () => {
  let sample;
  let users;
  let genres;

  beforeAll(async () => {
    await db.start();
    await db.connect();

    users = await seedUserCollection();
    genres = await seedGenreCollection();
    sample = createSampleTrack(users, genres);
  });

  afterAll(async () => {
    await db.disconnect();
    await db.stop();
  });

  afterEach(async () => {
    await TrackModel.deleteMany();
  });

  describe("1. User ID", () => {
    test("1.1. User ID is required", async () => {
      expect.assertions(1);

      const { user, ...track } = sample;

      try {
        await TrackModel.create(track);
      } catch (error) {
        expect(error.errors.user.properties.type).toBe("required");
      }
    });

    test("1.2. User ID is trimmed", async () => {
      expect.assertions(1);

      const user = getRandomSequence(28);

      const track = {
        ...sample,
        user: ` ${user} `,
      };

      const createdTrack = await TrackModel.create(track);

      expect(createdTrack).toHaveProperty("user", user);
    });
  });

  describe("2. Title", () => {
    test("2.1. Title is required", async () => {
      expect.assertions(1);

      const { title, ...track } = sample;

      try {
        await TrackModel.create(track);
      } catch (error) {
        expect(error.errors.title.properties.type).toBe("required");
      }
    });

    test("2.2. Title is trimmed", async () => {
      expect.assertions(1);

      const title = faker.name.title();

      const track = {
        ...sample,
        title: ` ${title} `,
      };

      const createdTrack = await TrackModel.create(track);

      expect(createdTrack).toHaveProperty("title", title);
    });
  });

  describe("3. Duration", () => {
    test("3.1. Duration is required", async () => {
      expect.assertions(1);

      const { duration, ...track } = sample;

      try {
        await TrackModel.create(track);
      } catch (error) {
        expect(error.errors.duration.properties.type).toBe("required");
      }
    });

    test("3.2. Duration must be a number", async () => {
      expect.assertions(1);

      const track = {
        ...sample,
        duration: "foo",
      };

      try {
        await TrackModel.create(track);
      } catch (error) {
        expect(error.errors.duration.kind).toBe("Number");
      }
    });

    test("3.3. Duration must be a positive number (0 included)", async () => {
      expect.assertions(1);

      const track = {
        ...sample,
        duration: -1,
      };

      try {
        await TrackModel.create(track);
      } catch (error) {
        expect(error.errors.duration.kind).toBe("min");
      }
    });
  });

  describe("4. Released date", () => {
    test("4.1. Released date must be with format 'YYYY-MM-DD' and valid", async () => {
      expect.assertions(1);

      const validTrack = {
        ...sample,
        released_date: "2000-01-01",
      };

      const invalidTrack = {
        ...sample,
        released_date: "1st January 2000",
      };

      await TrackModel.create(validTrack);
      await TrackModel.create(invalidTrack).catch((error) => {
        expect(error.errors.released_date.properties.type).toBe("user defined");
      });
    });

    test("4.2. Released date is trimmed", async () => {
      expect.assertions(1);

      const released_date = "2000-01-01";

      const track = {
        ...sample,
        released_date: ` ${released_date} `,
      };

      const createdTrack = await TrackModel.create(track);

      expect(createdTrack).toHaveProperty("released_date", released_date);
    });
  });

  describe("5. Color", () => {
    test("5.1. Title is trimmed", async () => {
      expect.assertions(1);

      const color = faker.commerce.color();

      const track = {
        ...sample,
        color: ` ${color} `,
      };

      const createdTrack = await TrackModel.create(track);

      expect(createdTrack).toHaveProperty("color", color);
    });
  });

  describe("6. Genres", () => {
    test("6.1. Genres must be an array of ObjectId", async () => {
      expect.assertions(3);

      const idGenre = new Types.ObjectId().toString();

      const validTrack01 = {
        ...sample,
        genres: [idGenre],
      };

      const validTrack02 = {
        ...sample,
        genres: idGenre,
      };

      const invalidTrack = {
        ...sample,
        genres: ["foo"],
      };

      await TrackModel.create(validTrack01).then((createdTrack) => {
        expect(createdTrack.genres[0].toString()).toBe(idGenre);
      });

      await TrackModel.create(validTrack02).then((createdTrack) => {
        expect(createdTrack.genres[0].toString()).toBe(idGenre);
      });

      await TrackModel.create(invalidTrack).catch((error) => {
        expect(error.errors["genres.0"].kind).toBe("[ObjectId]");
      });
    });
  });

  describe("8. Liked by", () => {
    test("8.1. Liked by must be an array of String", async () => {
      expect.assertions(2);

      const idUser = getRandomSequence(28);

      const validTrack01 = {
        ...sample,
        liked_by: [idUser],
      };

      const validTrack02 = {
        ...sample,
        liked_by: idUser,
      };

      await TrackModel.create(validTrack01).then((createdTrack) => {
        expect(createdTrack.liked_by[0]).toBe(idUser);
      });

      await TrackModel.create(validTrack02).then((createdTrack) => {
        expect(createdTrack.liked_by[0]).toBe(idUser);
      });
    });
  });

  describe("8. Song URL", () => {
    test("8.1. URL is trimmed", async () => {
      expect.assertions(1);

      const url = faker.internet.url();

      const track = {
        ...sample,
        url: ` ${url} `,
      };

      const createdTrack = await TrackModel.create(track);

      expect(createdTrack).toHaveProperty("url", url);
    });

    test("8.2. URL must be valid", async () => {
      expect.assertions(1);

      const url = "foo";

      const track = {
        ...sample,
        url,
      };

      try {
        await TrackModel.create(track);
      } catch (error) {
        expect(error.errors["url"].properties.type).toBe("user defined");
      }
    });
  });

  describe("9. Thumbnail (default)", () => {
    test("9.1. Thumbnail URL is trimmed", async () => {
      expect.assertions(1);

      const url = faker.image.imageUrl();

      const track = {
        ...sample,
        thumbnails: {
          ...sample.thumbnails,
          url_default: ` ${url} `,
        },
      };

      const createdTrack = await TrackModel.create(track);

      expect(createdTrack).toHaveProperty("thumbnails.url_default", url);
    });

    test("9.2. Thumbnail URL must be valid", async () => {
      expect.assertions(1);

      const url = "foo";

      const track = {
        ...sample,
        thumbnails: {
          ...sample.thumbnails,
          url_default: url,
        },
      };

      try {
        await TrackModel.create(track);
      } catch (error) {
        expect(error.errors["thumbnails.url_default"].properties.type).toBe("user defined");
      }
    });
  });

  describe("10. Thumbnail (medium)", () => {
    test("10.1. Thumbnail URL is trimmed", async () => {
      expect.assertions(1);

      const url = faker.image.imageUrl();

      const track = {
        ...sample,
        thumbnails: {
          ...sample.thumbnails,
          url_medium: ` ${url} `,
        },
      };

      const createdTrack = await TrackModel.create(track);

      expect(createdTrack).toHaveProperty("thumbnails.url_medium", url);
    });

    test("10.2. Thumbnail URL must be valid", async () => {
      expect.assertions(1);

      const url = "foo";

      const track = {
        ...sample,
        thumbnails: {
          ...sample.thumbnails,
          url_medium: url,
        },
      };

      try {
        await TrackModel.create(track);
      } catch (error) {
        expect(error.errors["thumbnails.url_medium"].properties.type).toBe("user defined");
      }
    });
  });

  describe("10. Thumbnail (large)", () => {
    test("10.1. Thumbnail URL is trimmed", async () => {
      expect.assertions(1);

      const url = faker.image.imageUrl();

      const track = {
        ...sample,
        thumbnails: {
          ...sample.thumbnails,
          url_large: ` ${url} `,
        },
      };

      const createdTrack = await TrackModel.create(track);

      expect(createdTrack).toHaveProperty("thumbnails.url_large", url);
    });

    test("10.2. Thumbnail URL must be valid", async () => {
      expect.assertions(1);

      const url = "foo";

      const track = {
        ...sample,
        thumbnails: {
          ...sample.thumbnails,
          url_large: url,
        },
      };

      try {
        await TrackModel.create(track);
      } catch (error) {
        expect(error.errors["thumbnails.url_large"].properties.type).toBe("user defined");
      }
    });
  });

  describe("11. Number of times has been played", () => {
    test("11.1. Default value is 0", async () => {
      expect.assertions(1);

      const { num_plays, ...track } = sample;

      const createdTrack = await TrackModel.create(track);

      expect(createdTrack).toHaveProperty("num_plays", 0);
    });

    test("11.2. Value must be a number", async () => {
      expect.assertions(1);

      const track = {
        ...sample,
        num_plays: "foo",
      };

      try {
        await TrackModel.create(track);
      } catch (error) {
        expect(error.errors.num_plays.kind).toBe("Number");
      }
    });

    test("11.3. Value must be a positive number (0 included)", async () => {
      expect.assertions(1);

      const track = {
        ...sample,
        num_plays: -1,
      };

      try {
        await TrackModel.create(track);
      } catch (error) {
        expect(error.errors.num_plays.kind).toBe("min");
      }
    });
  });

  describe("12. Number of likes", () => {
    test("12.1. Value depends on the length of the 'liked_by' array", async () => {
      expect.assertions(1);

      const length = 2;

      const track = {
        ...sample,
        liked_by: Array.from({ length }, () => new Types.ObjectId().toString()),
      };

      const createdTrack = await TrackModel.create(track);

      expect(createdTrack).toHaveProperty("num_likes", length);
    });

    test("12.2. Value is readonly / cannot be overwritten (virtual)", async () => {
      expect.assertions(1);

      const track = {
        ...sample,
        num_likes: 1000,
      };

      const createdTrack = await TrackModel.create(track);

      expect(createdTrack).toHaveProperty("num_likes", createdTrack.liked_by.length);
    });
  });
});
