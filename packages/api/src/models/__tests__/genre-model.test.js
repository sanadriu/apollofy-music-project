const db = require("../../services/db");
const faker = require("faker");
const GenreModel = require("../genre-model");
const { generateRandomSequence } = require("../../utils");

function createSampleGenre() {
  return {
    name: faker.music.genre(),
    url_image: faker.image.imageUrl(),
    url_thumbnail: faker.image.imageUrl(),
  };
}

describe("genre-schema", () => {
  beforeAll(async () => {
    await db.start();
    await db.connect();
  });

  afterAll(async () => {
    await db.disconnect();
    await db.stop();
  });

  describe("1. Name", () => {
    test("1.1. Name is required", async () => {
      expect.assertions(1);

      const { name, ...genre } = createSampleGenre();

      try {
        await GenreModel.create(genre);
      } catch (error) {
        expect(error.errors.name.properties.type).toBe("required");
      }
    });

    test("1.2. Name is unique", async () => {
      expect.assertions(1);

      const genre01 = { ...createSampleGenre(), name: "foo" };
      const genre02 = { ...createSampleGenre(), name: "foo" };

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
        ...createSampleGenre(),
        name: ` ${name} `,
      };

      const createdGenre = await GenreModel.create(genre);

      expect(createdGenre).toHaveProperty("name", name);
    });
  });

  describe("2. URL Image", () => {
    test("2.1. URL Image is trimmed", async () => {
      expect.assertions(1);

      const url_image = faker.internet.url();

      const genre = {
        ...createSampleGenre(),
        url_image: ` ${url_image} `,
      };

      const createdGenre = await GenreModel.create(genre);

      expect(createdGenre).toHaveProperty("url_image", url_image);
    });

    test("2.2. URL Image must be valid", async () => {
      expect.assertions(1);

      const url_image = generateRandomSequence(20);

      const genre = {
        ...createSampleGenre(),
        url_image,
      };

      try {
        await GenreModel.create(genre);
      } catch (error) {
        expect(error.errors.url_image.properties.type).toBe("user defined");
      }
    });
  });

  describe("2. URL Thumbnail", () => {
    test("2.1. URL Thumbnail is trimmed", async () => {
      expect.assertions(1);

      const url_thumbnail = faker.internet.url();

      const genre = {
        ...createSampleGenre(),
        url_thumbnail: ` ${url_thumbnail} `,
      };

      const createdGenre = await GenreModel.create(genre);

      expect(createdGenre).toHaveProperty("url_thumbnail", url_thumbnail);
    });

    test("2.2. URL Thumbnail must be valid", async () => {
      expect.assertions(1);

      const url_thumbnail = generateRandomSequence(20);

      const genre = {
        ...createSampleGenre(),
        url_thumbnail,
      };

      try {
        await GenreModel.create(genre);
      } catch (error) {
        expect(error.errors.url_thumbnail.properties.type).toBe("user defined");
      }
    });
  });
});
