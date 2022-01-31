const log = require("../services/logger");
const { deleteCollections, seedCollections } = require("./collections");

async function seed() {
  try {
    await deleteCollections();
    await seedCollections();
  } catch (error) {
    log.error(error.message);

    await deleteCollections();
  }
}

module.exports = seed;
