const { Types } = require("mongoose");
const { Album, User } = require("../models");

const { filterUserTracks } = require("./utils");

async function getAlbums(req, res, next) {
  try {
    const {
      page = 1,
      sort = "created_at",
      order = "asc",
      limit = 10,
      genre,
      track,
      user,
    } = req.query;

    const filter = {
      ...(genre && { genres: { $in: [genre] } }),
      ...(track && { tracks: { $in: [track] } }),
      ...(user && { user }),
    };

    const pages = await Album.getNumPages(limit, filter);

    if (isNaN(page) || page <= 0) {
      return res.status(400).send({
        data: null,
        success: false,
        message: "Wrong value for page",
        pages,
      });
    }

    if (!["asc", "desc"].includes(order)) {
      return res.status(400).send({
        data: null,
        success: false,
        message: "Wrong value for order",
        pages,
      });
    }

    if (page > pages) {
      return res.status(404).send({
        data: null,
        success: false,
        message: "Page not found",
        pages,
      });
    }

    const dbRes = await Album.getAlbums({ page, sort, order, limit, filter });

    return res.status(200).send({
      data: dbRes,
      success: true,
      message: "Albums fetched successfully",
      pages,
    });
  } catch (error) {
    next(error);
  }
}

async function getSingleAlbum(req, res, next) {
  try {
    const { idAlbum } = req.params;
    const { extend = false } = req.query;

    if (!Types.ObjectId.isValid(idAlbum)) {
      return res.status(400).send({
        data: null,
        success: false,
        message: "Wrong album ID",
      });
    }

    const dbRes = await Album.getAlbum(idAlbum, { extend });

    if (dbRes === null) {
      return res.status(404).send({
        data: null,
        success: false,
        message: "Album not found",
      });
    }

    return res.status(200).send({
      data: dbRes,
      success: true,
      message: "Album fetched successfully",
    });
  } catch (error) {
    next(error);
  }
}

async function createAlbum(req, res, next) {
  try {
    const { tracks = [], ...details } = req.body;
    const { uid } = req.user;

    const allowedTracks = await filterUserTracks(uid, tracks);

    const dbRes = await Album.createAlbum(uid, { ...details, tracks: allowedTracks });

    return res.status(200).send({
      data: dbRes.id,
      success: true,
      message: "Album created successfully",
    });
  } catch (error) {
    next(error);
  }
}

async function updateAlbum(req, res, next) {
  try {
    const { tracks = [], ...details } = req.body;
    const { uid } = req.user;
    const { idAlbum } = req.params;

    if (!Types.ObjectId.isValid(idAlbum)) {
      return res.status(400).send({
        data: null,
        success: false,
        message: "Wrong album ID",
      });
    }

    const dbRes = await Album.findById(idAlbum).notDeleted();

    if (dbRes === null) {
      return res.status(404).send({
        data: null,
        success: false,
        message: "Album not found",
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

    const allowedTracks = await filterUserTracks(uid, tracks);

    await Album.updateAlbum(idAlbum, { ...details, tracks: allowedTracks });

    return res.status(200).send({
      data: null,
      success: true,
      message: "Album updated successfully",
    });
  } catch (error) {
    next(error);
  }
}

async function deleteAlbum(req, res, next) {
  try {
    const { uid } = req.user;
    const { idAlbum } = req.params;

    if (!Types.ObjectId.isValid(idAlbum)) {
      return res.status(400).send({
        data: null,
        success: false,
        message: "Wrong album ID",
      });
    }

    const dbRes = await Album.findById(idAlbum).notDeleted();

    if (dbRes === null) {
      return res.status(404).send({
        data: null,
        success: false,
        message: "Album not found",
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

    await Album.deleteAlbum(idAlbum);

    return res.status(200).send({
      data: null,
      success: true,
      message: "Album deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}

async function likeAlbum(req, res, next) {
  try {
    const { uid } = req.user;
    const { idAlbum } = req.params;

    if (!Types.ObjectId.isValid(idAlbum)) {
      return res.status(400).send({
        data: null,
        success: false,
        message: "Wrong album ID",
      });
    }

    if (!(await User.getUser(uid))) {
      return res.status(404).send({
        data: null,
        success: false,
        message: "User not found",
      });
    }

    if (!(await Album.getAlbum(idAlbum))) {
      return res.status(404).send({
        data: null,
        success: false,
        message: "Album not found",
      });
    }

    await User.likeAlbum(uid, idAlbum);
    await Album.getLiked(idAlbum, uid);

    return res.status(200).send({
      data: null,
      success: true,
      message: "Operation done successfully",
    });
  } catch (error) {
    next(error);
  }
}

async function getUserAlbums(req, res, next) {
  try {
    const { page = 1, sort = "created_at", order = "asc", limit = 10, extend = false } = req.query;
    const { uid } = req.user;

    const pages = await Album.getNumPages(limit, { user: uid });

    if (isNaN(page) || page <= 0) {
      return res.status(400).send({
        data: null,
        success: false,
        message: "Wrong page",
        pages,
      });
    }

    if (page > pages) {
      return res.status(404).send({
        data: null,
        success: false,
        message: "Page not found",
        pages,
      });
    }

    const dbRes = await Album.getUserAlbums(uid, { page, sort, order, limit, extend });

    return res.status(200).send({
      data: dbRes,
      success: true,
      message: "Albums fetched successfully",
      pages,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAlbums,
  getSingleAlbum,
  createAlbum,
  updateAlbum,
  deleteAlbum,
  likeAlbum,
  getUserAlbums,
};
