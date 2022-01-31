const { userRouter } = require("./user-routes");
const { authRouter } = require("./auth-routes");
const { trackRouter } = require("./track-routes");

module.exports = {
  userRouter,
  authRouter,
  trackRouter,
};
