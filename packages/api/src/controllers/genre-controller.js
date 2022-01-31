const { Genre } = require("../models");

async function getGenres(req, res, next) {
  try {
    const genres = await Genre.find({});

    return res.status(200).send({
      data: genres,
      success: true,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
    getGenres,
}