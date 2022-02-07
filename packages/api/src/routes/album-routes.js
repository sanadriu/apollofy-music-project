const Router = require("express").Router;

const { authMiddleware } = require("../middlewares");
const { albumController } = require("../controllers");

const albumRouter = Router();

albumRouter.get("/", albumController.getAlbums);
albumRouter.get("/:idAlbum", albumController.getSingleAlbum);
albumRouter.post("/", authMiddleware, albumController.createAlbum);
albumRouter.patch("/:idAlbum", authMiddleware, albumController.updateAlbum);
albumRouter.delete("/:idAlbum", authMiddleware, albumController.deleteAlbum);
albumRouter.patch("/:idAlbum/like/", authMiddleware, albumController.likeAlbum);

module.exports = {
  albumRouter,
};
