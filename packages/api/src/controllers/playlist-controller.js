const { Types } = require("mongoose");
const { Playlist } = require("../models");

async function getPlaylists(req, res, next) {
  try {
    const { page = 1, sort = "created_at", order = "asc" } = req.query;

    const pages = await Playlist.getNumPages();

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

    const dbRes = await Playlist.getPlaylists(page, sort, order);

    return res.status(200).send({
      data: dbRes,
      success: true,
      message: "Playlists fetched successfully",
      pages,
    });
  } catch (error) {
    next(error);
  }
}

async function getSinglePlaylist(req, res, next) {
  try {
    const { idPlaylist } = req.params;
    const { extend = false } = req.query;

    if (!Types.ObjectId.isValid(idPlaylist)) {
      return res.status(400).send({
        data: null,
        success: false,
        message: "Wrong playlist ID",
      });
    }

    const dbRes = await Playlist.getPlaylist(idPlaylist, extend);

    if (dbRes === null) {
      return res.status(404).send({
        data: null,
        success: false,
        message: "Playlist not found",
      });
    }

    return res.status(200).send({
      data: dbRes,
      success: true,
      message: "Playlist fetched successfully",
    });
  } catch (error) {
    next(error);
  }
}

async function createPlaylist(req, res, next) {
  try {
    const details = req.body;
    const { uid } = req.user;

    const dbRes = await Playlist.createPlaylist(uid, details);

    return res.status(200).send({
      data: dbRes.id,
      success: true,
      message: "Playlist created successfully",
    });
  } catch (error) {
    next(error);
  }
}

async function updatePlaylist(req, res, next) {
  try {
    const details = req.body;
    const { uid } = req.user;
    const { idPlaylist } = req.params;

    if (!Types.ObjectId.isValid(idPlaylist)) {
      return res.status(400).send({
        data: null,
        success: false,
        message: "Wrong playlist ID",
      });
    }

    const dbRes = await Playlist.getPlaylist(idPlaylist);

    if (dbRes === null) {
      return res.status(404).send({
        data: null,
        success: false,
        message: "Playlist not found",
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

    await Playlist.updatePlaylist(idPlaylist, details);

    return res.status(200).send({
      data: null,
      success: true,
      message: "Playlist updated successfully",
    });
  } catch (error) {
    next(error);
  }
}

async function deletePlaylist(req, res, next) {
  try {
    const { uid } = req.user;
    const { idPlaylist } = req.params;

    if (!Types.ObjectId.isValid(idPlaylist)) {
      return res.status(400).send({
        data: null,
        success: false,
        message: "Wrong playlist ID",
      });
    }

    const dbRes = await Playlist.getPlaylist(idPlaylist);

    if (dbRes === null) {
      return res.status(404).send({
        data: null,
        success: false,
        message: "Playlist not found",
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

    await Playlist.deletePlaylist(idPlaylist);

    return res.status(200).send({
      data: null,
      success: true,
      message: "Playlist deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}

async function getUserPlaylists(req, res, next) {
  try {
    const { uid } = req.user;
    const { page = 1, sort = "created_at", order = "asc" } = req.query;

    const pages = await Playlist.getNumPages({ user: uid });

    if (!isNaN(page) || page <= 0) {
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
    const dbRes = await Playlist.getUserPlaylists(page, sort, order, uid);

    return res.status(200).send({
      data: dbRes,
      success: true,
      message: "Playlists fetched successfully",
    });
  } catch (message) {
    next(error);
  }
}

module.exports = {
  getPlaylists,
  getSinglePlaylist,
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
  getUserPlaylists,
};
