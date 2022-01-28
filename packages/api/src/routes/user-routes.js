const Router = require("express").Router;

const { authMiddleware } = require("../middlewares");
const { userController } = require("../controllers");

const userRouter = Router();

// userRouter.get("/", userController.getUsers);
// userRouter.get("/:idUser", userController.getSingleUser);
// userRouter.patch("/:idUser", authMiddleware, userController.updateUser);

module.exports = {
  userRouter,
};
