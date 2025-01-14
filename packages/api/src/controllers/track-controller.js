const { Types } = require("mongoose");
const { Track, User } = require("../models");

async function getTracks(req, res, next) {
  try {
    const {
      page = 1,
      sort = "created_at",
      order = "asc",
      limit = 10,
      no_data = false,
      genre,
      user,
    } = req.query;

    const filter = {
      ...(genre && { genres: { $in: [genre] } }),
      ...(user && { user }),
    };

    const pages = await Track.getNumPages(limit, filter);
    const count = await Track.countDocuments(filter);

    if (!no_data) {
      if (!Number.isInteger(page) || page <= 0) {
        return res.status(400).send({
          data: null,
          success: false,
          message: "Wrong value for page",
        });
      }

      if (!Number.isInteger(limit) || limit <= 0) {
        return res.status(400).send({
          data: null,
          success: false,
          message: "Wrong value for limit",
        });
      }

      if (!["asc", "desc"].includes(order)) {
        return res.status(400).send({
          data: null,
          success: false,
          message: "Wrong value for order",
        });
      }

      if (count === 0) {
        return res.status(200).send({
          data: [],
          success: true,
          message: "No tracks were found",
          count,
          pages,
          page: Number(page),
        });
      }

      if (page > pages) {
        return res.status(404).send({
          data: null,
          success: false,
          message: "Page not found",
        });
      }

      const dbRes = await Track.getTracks({ page, sort, order, limit, filter });

      return res.status(200).send({
        data: dbRes,
        success: true,
        message: "Tracks fetched successfully",
        count,
        pages,
        page: Number(page),
      });
    } else {
      return res.status(200).send({
        data: null,
        success: true,
        message: "Request successful",
        count,
        pages,
        page: null,
      });
    }
  } catch (error) {
    next(error);
  }
}

async function getSingleTrack(req, res, next) {
  try {
    const { idTrack } = req.params;
    const { extend = false } = req.query;

    if (!Types.ObjectId.isValid(idTrack)) {
      return res.status(400).send({
        data: null,
        success: false,
        message: "Wrong track ID",
      });
    }

    const dbRes = await Track.getTrack(idTrack, { extend });

    if (dbRes === null) {
      return res.status(404).send({
        data: null,
        success: false,
        message: "Track not found",
      });
    }

    res.status(200).send({
      data: dbRes,
      success: true,
      message: "Track fetched successfully",
    });
  } catch (error) {
    next(error);
  }
}

async function createTrack(req, res, next) {
  try {
    const details = req.body;
    const { uid } = req.user;

    const dbRes = await Track.createTrack(uid, details);

    return res.status(200).send({
      data: dbRes.id,
      success: true,
      message: "Track created successfully",
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
        success: false,
        message: "Wrong track ID",
      });
    }

    const dbRes = await Track.findById(idTrack).notDeleted();

    if (dbRes === null) {
      return res.status(404).send({
        data: null,
        success: false,
        message: "Track not found",
      });
    }

    const isAuthorized = dbRes.user === uid;

    if (!isAuthorized) {
      return res.status(401).send({
        data: null,
        success: false,
        message: "Unauthorized",
      });
    }

    await Track.updateTrack(idTrack, details);

    return res.status(200).send({
      data: null,
      success: true,
      message: "Track updated successfully",
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
        success: false,
        message: "Wrong track ID",
      });
    }

    const dbRes = await Track.findById(idTrack).notDeleted();

    if (dbRes === null) {
      return res.status(404).send({
        data: null,
        success: false,
        message: "Track not found",
      });
    }

    const isAuthorized = dbRes.user === uid;

    if (!isAuthorized) {
      return res.status(401).send({
        data: null,
        success: false,
        message: "Unauthorized",
      });
    }

    await Track.deleteTrack(idTrack);

    return res.status(200).send({
      data: null,
      success: true,
      message: "Track deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}

async function likeTrack(req, res, next) {
  try {
    const { uid } = req.user;
    const { idTrack } = req.params;

    if (!Types.ObjectId.isValid(idTrack)) {
      return res.status(400).send({
        data: null,
        success: false,
        message: "Wrong track ID",
      });
    }

    if (!(await User.getUser(uid))) {
      return res.status(404).send({
        data: null,
        success: false,
        message: "User not found",
      });
    }

    if (!(await Track.getTrack(idTrack))) {
      return res.status(404).send({
        data: null,
        success: false,
        message: "Track not found",
      });
    }

    await User.likeTrack(uid, idTrack);
    await Track.getLiked(idTrack, uid);

    return res.status(200).send({
      data: null,
      success: true,
      message: "Operation done successfully",
    });
  } catch (error) {
    next(error);
  }
}

async function playTrack(req, res, next) {
  try {
    const { idTrack } = req.params;

    if (!Types.ObjectId.isValid(idTrack)) {
      return res.status(400).send({
        data: null,
        success: false,
        message: "Wrong track ID",
      });
    }

    const dbRes = await Track.findById(idTrack).notDeleted();

    if (dbRes === null) {
      return res.status(404).send({
        data: null,
        success: false,
        message: "Track not found",
      });
    }

    await Track.getPlayed(idTrack);

    return res.status(200).send({
      data: null,
      success: true,
      message: "Operation done successfully",
    });
  } catch (error) {
    next(error);
  }
}

async function getUserTracks(req, res, next) {
  try {
    const {
      page = 1,
      sort = "created_at",
      order = "asc",
      limit = 10,
      extend = false,
      no_data = false,
    } = req.query;
    const { uid } = req.user;

    const pages = await Track.getNumPages(limit, { user: uid });
    const count = await Track.countDocuments({ user: uid });

    if (!no_data) {
      if (!Number.isInteger(page) || page <= 0) {
        return res.status(400).send({
          data: null,
          success: false,
          message: "Wrong value for page",
        });
      }

      if (!["asc", "desc"].includes(order)) {
        return res.status(400).send({
          data: null,
          success: false,
          message: "Wrong value for order",
        });
      }

      if (count === 0) {
        return res.status(200).send({
          data: [],
          success: true,
          message: "No tracks were found",
          count,
          pages,
          page: Number(page),
        });
      }

      if (page > pages) {
        return res.status(404).send({
          data: null,
          success: false,
          message: "Page not found",
        });
      }

      const dbRes = await Track.getUserTracks(uid, { page, sort, order, limit, extend });

      return res.status(200).send({
        data: dbRes,
        success: true,
        message: "Tracks fetched successfully",
        count,
        pages,
        page: Number(page),
      });
    } else {
      return res.status(200).send({
        data: null,
        success: true,
        message: "Request successful",
        count,
        pages,
        page: null,
      });
    }
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
  likeTrack,
  playTrack,
  getUserTracks,
};
