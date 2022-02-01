const Router = require("express").Router;

const { genreController } = require("../controllers");

const genreRouter = Router();

genreRouter.get("/", genreController.getGenres);
genreRouter.get("/:idGenre", genreController.getSingleGenre);

module.exports = {
    genreRouter,
};
