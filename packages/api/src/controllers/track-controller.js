const { Types } = require("mongoose");
const { Track } = require("../models");

async function getTracks(req, res, next) {
  try {
    const { page = 1, sort = "created_at", order = "asc" } = req.query;

    const pages = await Track.getNumPages();

    if (!(!isNaN(page) && page > 0)) {
      return res.status(400).send({
        data: null,
        error: "Wrong page",
        pages,
      });
    }

    if (page > pages) {
      return res.status(404).send({
        data: null,
        error: "Page not found",
        pages,
      });
    }

    const dbRes = await Track.getTracks(page, sort, order);

    res.status(200).send({
      success: true,
      data: dbRes,
      pages,
    });
  } catch (error) {
    next(error);
  }
}

async function getSingleTrack(req, res, next) {
  try {
    const { idTrack } = req.params;
    const { extend = false } = req.query;

    const dbRes = await Track.getTrack(idTrack, extend);

    if (dbRes === null) {
      return res.status(404).send({
        success: false,
        message: "Track not found",
        data: dbRes,
      });
    }

    res.status(200).send({
      success: true,
      data: dbRes,
    });
  } catch (error) {
    next(error);
  }
}

async function createTrack(req, res, next) {
  try {
    const details = req.body;
    const { uid } = req.user;

    const track = await Track.createTrack(uid, details);

    return res.status(200).send({
      data: track.id,
      message: "Track created successfully",
      error: null,
    });
  } catch (error) {
    next(error);
  }
}

async function updateTrack(req, res, next) {
  try {
    const details = req.body;
    const { idTrack } = req.params;
    const { uid } = req.user;

    if (!Types.ObjectId.isValid(idTrack)) {
      return res.status(400).send({
        data: null,
        error: "Wrong track ID",
      });
    }

    const dbRes = await Track.getTrack(idTrack);

    if (!dbRes) {
      return res.status(404).send({
        data: null,
        error: "Track not found",
      });
    }

    const isAuthorized = dbRes.user === uid;

    if (!isAuthorized) {
      return res.status(401).send({
        data: null,
        error: "Unauthorized",
      });
    }

    await Track.updateTrack(idTrack, details);

    return res.status(200).send({
      data: "Track updated successfully",
      error: null,
    });
  } catch (error) {
    next(error);
  }
}

async function deleteTrack(req, res, next) {
  try {
    const { idTrack } = req.params;
    const { uid } = req.user;

    if (!Types.ObjectId.isValid(idTrack)) {
      return res.status(400).send({
        data: null,
        error: "Wrong track ID",
      });
    }

    const dbRes = await Track.getTrack(idTrack);

    if (!dbRes) {
      return res.status(404).send({
        data: null,
        error: "Track not found",
      });
    }

    const isAuthorized = dbRes.user === uid;

    if (!isAuthorized) {
      return res.status(401).send({
        data: null,
        error: "Unauthorized",
      });
    }

    await Track.deleteTrack(idTrack, track);

    return res.status(200).send({
      data: "Track deleted successfully",
      error: null,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getTracks,
  getSingleTrack,
  updateTrack,
  deleteTrack,
  createTrack,
};
