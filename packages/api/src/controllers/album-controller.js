const { Types } = require("mongoose");
const { Album, Track } = require("../models");

async function getAlbums(req, res, next) {
  try {
    const { page = 1, sort = "created_at", order = "asc" } = req.query;

    const pages = await Album.getNumPages();

    if (isNaN(page) || page <= 0) {
      return res.status(400).send({
        data: null,
        error: "Wrong value for page",
        pages,
      });
    }

    if (!["asc", "desc"].includes(order)) {
      return res.status(400).send({
        data: null,
        error: "Wrong value for order",
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

    const dbRes = await Album.getAlbums(page, sort, order);

    return res.status(200).send({
      data: dbRes,
      error: null,
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
        error: "Wrong album ID",
      });
    }

    const dbRes = await Album.getAlbum(idAlbum, extend);

    if (!dbRes) {
      return res.status(404).send({
        data: null,
        error: "Album not found",
      });
    }

    return res.status(200).send({
      data: dbRes,
      error: null,
    });
  } catch (error) {
    next(error);
  }
}

async function createAlbum(req, res, next) {
  try {
    const { tracks: idTrackList, ...details } = req.body;
    const { uid } = req.user;

    const allowedTracks = await Promise.all(
      idTrackList.filter(async (idTrack) => {
        const dbRes = await Track.getTrack(idTrack);

        return dbRes.user === uid;
      }),
    );

    const dbRes = await Album.createAlbum(uid, { ...details, allowedTracks });

    return res.status(200).send({
      data: dbRes._id,
      error: null,
    });
  } catch (error) {
    next(error);
  }
}

async function updateAlbum(req, res, next) {
  try {
    const { tracks: idTrackList, ...details } = req.body;
    const { uid } = req.user;
    const { idAlbum } = req.params;

    if (!Types.ObjectId.isValid(idAlbum)) {
      return res.status(400).send({
        data: null,
        error: "Wrong album ID",
      });
    }

    const dbRes = await Album.getAlbum(idAlbum);

    if (!dbRes) {
      return res.status(404).send({
        data: null,
        error: "Album not found",
      });
    }

    const isAuthorized = dbRes.user === uid;

    if (!isAuthorized) {
      return res.status(401).send({
        data: null,
        error: "Unauthorized",
      });
    }

    const allowedTracks = await Promise.all(
      idTrackList.filter(async (idTrack) => {
        const dbRes = await Track.getTrack(idTrack);

        return dbRes.user === uid;
      }),
    );

    await Album.updateAlbum(idAlbum, { ...details, allowedTracks });

    return res.status(200).send({
      data: "Album updated successfully",
      error: null,
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
        error: "Wrong album ID",
      });
    }

    const dbRes = await Album.getAlbum(idAlbum);

    if (!dbRes) {
      return res.status(404).send({
        data: null,
        error: "Album not found",
      });
    }

    const isAuthorized = dbRes.user === uid;

    if (!isAuthorized) {
      return res.status(401).send({
        data: null,
        error: "Unauthorized",
      });
    }

    await Album.deleteAlbum(idAlbum);

    return res.status(200).send({
      data: "Album deleted successfully",
      error: null,
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
};
