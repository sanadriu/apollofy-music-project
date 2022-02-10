const { Track, Playlist, Album, User } = require("../models");

async function search(req, res, next) {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(404).send({
        data: null,
        success: false,
        message: "Not found",
      });
    }

    const tracks = await Track.find({ title: { $regex: q, $options: "i" } }).where({
      deleted_at: { $exists: false },
    });

    const playlists = await Playlist.find({ title: { $regex: q, $options: "i" } }).where({
      deleted_at: { $exists: false },
    });

    const albums = await Album.find({ title: { $regex: q, $options: "i" } }).where({
      deleted_at: { $exists: false },
    });

    const users = await User.find({ username: { $regex: q, $options: "i" } }).where({
      deleted_at: { $exists: false },
    });

    return res.status(200).send({
      data: { tracks, playlists, albums, users },
      success: true,
      message: "Request successful",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  search,
};
