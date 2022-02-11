const { Genre } = require("../models");

async function getGenres(req, res, next) {
  try {
    const dbRes = await Genre.find();

    return res.status(200).send({
      data: dbRes,
      success: true,
      message: "Genres fetched successfully",
    });
  } catch (error) {
    next(error);
  }
}

async function getSingleGenre(req, res, next) {
  try {
    const { idGenre } = req.params;

    if (!Types.ObjectId.isValid(idGenre)) {
      return res.status(400).send({
        data: null,
        success: false,
        message: "Wrong genre ID",
      });
    }

    const dbRes = await Genre.findById(idGenre);

    if (dbRes === null) {
      return res.status(404).send({
        data: null,
        success: false,
        message: "Genre not found",
      });
    }

    return res.status(200).send({
      data: dbRes,
      success: true,
      message: "Genre fetched successfully",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getGenres,
  getSingleGenre,
};
