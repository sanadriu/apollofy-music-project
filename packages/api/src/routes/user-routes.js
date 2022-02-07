const Router = require("express").Router;

const { authMiddleware } = require("../middlewares");
const {
  userController,
  albumController,
  trackController,
  playlistController,
} = require("../controllers");

const userRouter = Router();

userRouter.get("/me", authMiddleware, userController.getSelfUser);
userRouter.patch("/me", authMiddleware, userController.updateUser);
userRouter.delete("/me", authMiddleware, userController.deleteUser);
userRouter.get("/me/tracks", authMiddleware, trackController.getUserTracks);
userRouter.get("/me/albums", authMiddleware, albumController.getUserAlbums);
userRouter.get("/me/playlists", authMiddleware, playlistController.getUserPlaylists);
userRouter.patch("/me/like-album/:idAlbum", authMiddleware, userController.likeAlbum);
userRouter.patch("/me/like-track/:idTrack", authMiddleware, userController.likeTrack);
userRouter.patch("/me/follow-playlist/:idPlaylist", authMiddleware, userController.followPlaylist);
userRouter.patch("/me/follow-user/:idUser", authMiddleware, userController.followUser);
userRouter.get("/", userController.getUsers);
userRouter.get("/:idUser", userController.getSingleUser);

module.exports = {
  userRouter,
};
