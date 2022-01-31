const Router = require("express").Router;

const { authMiddleware } = require("../middlewares");
const { trackController } = require("../controllers");

const trackRouter = Router();

trackRouter.get("/", trackController.getTracks);
trackRouter.get("/:idTrack", trackController.getSingleTrack);
trackRouter.post("/",authMiddleware, trackController.createTrack);
trackRouter.patch("/:idTrack", authMiddleware, trackController.updateTrack);
trackRouter.delete("/:idTrack", authMiddleware, trackController.deleteTrack);

module.exports = {
    trackRouter,
};
