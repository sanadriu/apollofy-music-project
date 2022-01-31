const { userRouter } = require("./user-routes");
const { authRouter } = require("./auth-routes");
const { trackRouter } = require("./track-routes");
const { genreRouter } = require("./genre-routes");

module.exports = {
  userRouter,
  authRouter,
  trackRouter,
  genreRouter
};
