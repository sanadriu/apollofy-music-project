const Router = require("express").Router;

const { authMiddleware } = require("../middlewares");
const { userController } = require("../controllers");

const authRouter = Router();

authRouter.post("/sign-up", authMiddleware, userController.signUp);
authRouter.post("/sign-out", authMiddleware, userController.signOut);

module.exports = {
  authRouter,
};
