const { Track, Playlist, Album, User } = require("../models");

async function search(req, res, next) {
  try {
    const { q } = req.query;

    if (!q) {
      res.status(400).send({
        error: "Not found",
        data: null,
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

    res.status(200).send({
      success: true,
      data: { tracks, playlists, albums, users },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  search,
};
