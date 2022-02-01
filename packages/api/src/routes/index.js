const { userRouter } = require("./user-routes");
const { authRouter } = require("./auth-routes");
const { albumRouter } = require("./album-routes");
const { playlistRouter } = require("./playlist-routes");
const { trackRouter } = require("./track-routes");
const { genreRouter } = require("./genre-routes");

module.exports = {
  userRouter,
  authRouter,
  albumRouter,
  playlistRouter,
  trackRouter,
  genreRouter,
};
