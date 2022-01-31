const Router = require("express").Router;

const { authMiddleware } = require("../middlewares");
const { userController } = require("../controllers");

const userRouter = Router();

userRouter.get("/", userController.getUsers);
userRouter.get("/:idUser", userController.getSingleUser);
userRouter.patch("/me", authMiddleware, userController.updateUser);
userRouter.delete("/me", authMiddleware, userController.deleteUser);
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

module.exports = {
  userRouter,
};
