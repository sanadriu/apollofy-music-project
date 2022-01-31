const Router = require("express").Router;

const { authMiddleware } = require("../middlewares");
const { trackController } = require("../controllers");

const trackRouter = Router();

trackRouter.get("/", trackController.getTracks);
trackRouter.get("/:idTrack", trackController.getSingleTrack);
//trackRouter.patch("/:idTrack", authMiddleware, trackController.updateUser);
//trackRouter.delete("/:idTrack", authMiddleware, trackController.deleteUser);

module.exports = {
    trackRouter,
};
