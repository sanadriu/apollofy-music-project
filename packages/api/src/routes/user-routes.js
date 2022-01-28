const Router = require("express").Router;

const { authMiddleware } = require("../middlewares");
const { userController } = require("../controllers");

const userRouter = Router();

userRouter.get("/", userController.getUsers);
userRouter.get("/:idUser", userController.getSingleUser);
userRouter.patch("/:idUser", userController.updateUser);
// userRouter.delete("/:idUser", authMiddleware, userController.deleteUser);

module.exports = {
  userRouter,
};
