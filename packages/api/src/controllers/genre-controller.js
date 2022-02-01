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

async function getSingleGenre(req, res, next) {
  try {
    const { idGenre } = req.params;

    const dbRes = await Genre.findById(idGenre);

    if (dbRes === null) {
      return res.status(404).send({
        success: false,
        message: "Genre not found",
        data: dbRes,
      });
    }

    res.status(200).send({
      success: true,
      data: dbRes,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getGenres,
  getSingleGenre,
};
