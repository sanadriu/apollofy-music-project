const db = require("../../services/db");
const faker = require("faker");
const GenreModel = require("../genre-model");
const { getRandomSequence } = require("../../utils");
const { createSampleGenre } = require("../../db/samplers");

describe("genre-schema", () => {
  const sample = createSampleGenre();

  beforeAll(async () => {
    await db.start();
    await db.connect();
  });

  afterAll(async () => {
    await db.disconnect();
    await db.stop();
  });

  afterEach(async () => {
    await GenreModel.deleteMany();
  });

  describe("1. Name", () => {
    test("1.1. Name is required", async () => {
      expect.assertions(1);

      const { name, ...genre } = sample;

      try {
        await GenreModel.create(genre);
      } catch (error) {
        expect(error.errors.name.properties.type).toBe("required");
      }
    });

    test("1.2. Name is unique", async () => {
      expect.assertions(1);

      const genre01 = { ...sample, name: "foo" };
      const genre02 = { ...sample, name: "foo" };

      try {
        await GenreModel.create(genre01);
        await GenreModel.create(genre02);
      } catch (error) {
        expect(error.code).toBe(11000);
      }
    });

    test("1.3. Name is trimmed", async () => {
      expect.assertions(1);

      const name = faker.music.genre();

      const genre = {
        ...sample,
        name: ` ${name} `,
      };

      const createdGenre = await GenreModel.create(genre);

      expect(createdGenre).toHaveProperty("name", name);
    });
  });

  describe("2. Thumbnail (default)", () => {
    test("2.1. Thumbnail URL is trimmed", async () => {
      expect.assertions(1);

      const url = faker.image.imageUrl();

      const genre = {
        ...sample,
        thumbnails: {
          ...sample.thumbnails,
          url_default: ` ${url} `,
        },
      };

      const createdGenre = await GenreModel.create(genre);

      expect(createdGenre).toHaveProperty("thumbnails.url_default", url);
    });

    test("2.2. Thumbnail URL must be valid", async () => {
      expect.assertions(1);

      const url = "foo";

      const genre = {
        ...sample,
        thumbnails: {
          ...sample.thumbnails,
          url_default: url,
        },
      };

      try {
        await GenreModel.create(genre);
      } catch (error) {
        expect(error.errors["thumbnails.url_default"].properties.type).toBe(
          "user defined",
        );
      }
    });
  });

  describe("3. Thumbnail (medium)", () => {
    test("3.1. Thumbnail URL is trimmed", async () => {
      expect.assertions(1);

      const url = faker.image.imageUrl();

      const genre = {
        ...sample,
        thumbnails: {
          ...sample.thumbnails,
          url_medium: ` ${url} `,
        },
      };

      const createdGenre = await GenreModel.create(genre);

      expect(createdGenre).toHaveProperty("thumbnails.url_medium", url);
    });

    test("3.2. Thumbnail URL must be valid", async () => {
      expect.assertions(1);

      const url = "foo";

      const genre = {
        ...sample,
        thumbnails: {
          ...sample.thumbnails,
          url_medium: url,
        },
      };

      try {
        await GenreModel.create(genre);
      } catch (error) {
        expect(error.errors["thumbnails.url_medium"].properties.type).toBe(
          "user defined",
        );
      }
    });
  });

  describe("4. Thumbnail (large)", () => {
    test("4.1. Thumbnail URL is trimmed", async () => {
      expect.assertions(1);

      const url = faker.image.imageUrl();

      const genre = {
        ...sample,
        thumbnails: {
          ...sample.thumbnails,
          url_large: ` ${url} `,
        },
      };

      const createdGenre = await GenreModel.create(genre);

      expect(createdGenre).toHaveProperty("thumbnails.url_large", url);
    });

    test("4.2. Thumbnail URL must be valid", async () => {
      expect.assertions(1);

      const url = "foo";

      const genre = {
        ...sample,
        thumbnails: {
          ...sample.thumbnails,
          url_large: url,
        },
      };

      try {
        await GenreModel.create(genre);
      } catch (error) {
        expect(error.errors["thumbnails.url_large"].properties.type).toBe(
          "user defined",
        );
      }
    });
  });
});
