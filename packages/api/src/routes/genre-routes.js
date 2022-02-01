const Router = require("express").Router;

const { authMiddleware } = require("../middlewares");
const { genreController } = require("../controllers");

const genreRouter = Router();

genreRouter.get("/", genreController.getGenres);
//genreRouter.get("/:idTrack", trackController.getSingleTrack);

module.exports = {
    genreRouter,
};
