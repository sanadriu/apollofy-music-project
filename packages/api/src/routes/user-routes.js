const Router = require("express").Router;

const { authMiddleware } = require("../middlewares");
const { userController, albumController } = require("../controllers");

const userRouter = Router();

userRouter.get("/me", authMiddleware, userController.getSelfUser);
userRouter.patch("/me", authMiddleware, userController.updateUser);
userRouter.delete("/me", authMiddleware, userController.deleteUser);
<<<<<<< HEAD
// userRouter.get("/me/tracks", trackController.getUserTracks);
// userRouter.get("/me/albums", albumController.getUserAlbums);
// userRouter.get("/me/playlist", playlistController.getUserPlaylists);
userRouter.patch("/me/like-album/:idAlbum", authMiddleware, userController.likeAlbum);
userRouter.patch("/me/like-track/:idTrack", authMiddleware, userController.likeTrack);
userRouter.patch("/me/follow-playlist/:idPlaylist", authMiddleware, userController.followPlaylist);
userRouter.patch("/me/follow-user/:idUser", authMiddleware, userController.followUser);
userRouter.get("/", userController.getUsers);
userRouter.get("/:idUser", userController.getSingleUser);
=======
userRouter.patch(
  "/me/like-album/:idAlbum",
  authMiddleware,
  userController.deleteUser,
);
userRouter.patch(
  "/me/like-track/:idTrack",
  authMiddleware,
  userController.deleteUser,
);
userRouter.patch(
  "/me/follow-user/:idUser",
  authMiddleware,
  userController.deleteUser,
);
userRouter.patch(
  "/me/follow-playlist",
  authMiddleware,
  userController.deleteUser,
);
>>>>>>> 233a98d08ef5ba7fa798a404a647f416c62b5414

module.exports = {
  userRouter,
};
