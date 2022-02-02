const userController = require("./user-controller");
const albumController = require("./album-controller");
const playlistController = require("./playlist-controller");
const trackController = require("./track-controller");
const genreController = require("./genre-controller");
const searchController = require("./search-controller");

module.exports = {
  userController,
  albumController,
  playlistController,

  trackController,
  genreController,
  searchController,
};
