const { Types } = require("mongoose");
const { Playlist, User } = require("../models");

async function getPlaylists(req, res, next) {
  try {
    const {
      page = 1,
      sort = "created_at",
      order = "asc",
      limit = 10,
      no_data = false,
      user,
    } = req.query;

    const filter = {
      ...(user && { user }),
    };

    const pages = await Playlist.getNumPages(limit, filter);
    const count = await Playlist.countDocuments(filter);

    if (!no_data) {
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

      const dbRes = await Playlist.getPlaylists({ page, sort, order, limit, filter });

      return res.status(200).send({
        data: dbRes,
        success: true,
        message: "Playlists fetched successfully",
        count,
        pages,
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "Playlists fetched successfully",
        count,
        pages,
      });
    }
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

    const dbRes = await Playlist.getPlaylist(idPlaylist, { extend });

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

    const dbRes = await Playlist.findById(idPlaylist).notDeleted();

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

    const dbRes = await Playlist.findById(idPlaylist).notDeleted();

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

async function followPlaylist(req, res, next) {
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

    if (!(await User.getUser(uid))) {
      return res.status(404).send({
        data: null,
        success: false,
        message: "User not found",
      });
    }

    if (!(await Playlist.getPlaylist(idPlaylist))) {
      return res.status(404).send({
        data: null,
        success: false,
        message: "Playlist not found",
      });
    }

    await User.followPlaylist(uid, idPlaylist);
    await Playlist.getFollowed(idPlaylist, uid);

    return res.status(200).send({
      data: null,
      success: true,
      message: "Operation done successfully",
    });
  } catch (error) {
    next(error);
  }
}

async function getUserPlaylists(req, res, next) {
  try {
    const { uid } = req.user;
    const {
      page = 1,
      sort = "created_at",
      order = "asc",
      limit = 10,
      extend = false,
      no_data = false,
    } = req.query;

    const pages = await Playlist.getNumPages(limit, { user: uid });
    const count = await Playlist.countDocuments({ user: uid });

    if (!no_data) {
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
      const dbRes = await Playlist.getUserPlaylists(uid, { page, sort, order, limit, extend });

      return res.status(200).send({
        data: dbRes,
        success: true,
        message: "Playlists fetched successfully",
        count,
        pages,
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "Playlists fetched successfully",
        count,
        pages,
      });
    }
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
  followPlaylist,
  getUserPlaylists,
};
