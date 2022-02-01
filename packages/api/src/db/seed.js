const { logger } = require("../services");
const { deleteCollections, seedCollections } = require("./collections");

async function seed() {
  try {
    await deleteCollections();
    await seedCollections();
  } catch (error) {
    logger.error(error.message);

    await deleteCollections();
  }
}

module.exports = seed;
