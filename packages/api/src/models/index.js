const UserModel = require("./user-model");
const PlaylistModel = require("./playlist-model");
const AlbumModel = require("./album-model");
const GenreModel = require("./genre-model");
const TrackModel = require("./track-model");

module.exports = {
  User: UserModel,
  Playlist: PlaylistModel,
  Album: AlbumModel,
  Genre: GenreModel,
  Track: TrackModel,
};
