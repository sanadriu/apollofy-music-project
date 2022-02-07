const Router = require("express").Router;

const { authMiddleware } = require("../middlewares");
const { playlistController } = require("../controllers");

const playlistRouter = Router();

playlistRouter.get("/", playlistController.getPlaylists);
playlistRouter.get("/:idPlaylist", playlistController.getSinglePlaylist);
playlistRouter.post("/", authMiddleware, playlistController.createPlaylist);
playlistRouter.patch("/:idPlaylist", authMiddleware, playlistController.updatePlaylist);
playlistRouter.delete("/:idPlaylist", authMiddleware, playlistController.deletePlaylist);
playlistRouter.patch("/:idPlaylist/follow", authMiddleware, playlistController.followPlaylist);

module.exports = {
  playlistRouter,
};
