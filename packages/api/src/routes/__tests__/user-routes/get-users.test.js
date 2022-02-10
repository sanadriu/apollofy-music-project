const collections = require("../../../db/collections");
const samplers = require("../../../db/samplers");
const { start, connect, disconnect, stop } = require("../../../services/db");

describe("user-crud", () => {
  beforeAll(async () => {
    await start();
    await connect();
  });

  afterAll(async () => {
    await disconnect();
    await stop();
  });

  beforeEach(async () => {});

  afterEach(async () => {});
});
