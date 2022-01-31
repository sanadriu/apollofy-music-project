const { userRouter } = require("./user-routes");
const { authRouter } = require("./auth-routes");
const { albumRouter } = require("./album-routes");
const { playlistRouter } = require("./playlist-routes");

module.exports = {
  userRouter,
  authRouter,
  albumRouter,
  playlistRouter,
};
