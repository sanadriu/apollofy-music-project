const Router = require("express").Router;

const { authMiddleware } = require("../middlewares");
const {
  userController,
  albumController,
  trackController,
  playlistController,
} = require("../controllers");

const userRouter = Router();

userRouter.get("/me", authMiddleware, userController.getUserProfile);
userRouter.patch("/me", authMiddleware, userController.updateUser);
userRouter.delete("/me", authMiddleware, userController.deleteUser);
userRouter.get("/me/followed-users", authMiddleware, userController.getFollowedUsers);
userRouter.get("/me/tracks", authMiddleware, trackController.getUserTracks);
userRouter.get("/me/albums", authMiddleware, albumController.getUserAlbums);
userRouter.get("/me/playlists", authMiddleware, playlistController.getUserPlaylists);

userRouter.get("/", userController.getUsers);
userRouter.get("/:idUser", userController.getSingleUser);
userRouter.patch("/:idUser/follow", authMiddleware, userController.followUser);

module.exports = {
  userRouter,
};
