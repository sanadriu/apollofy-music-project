const express = require("express");
const swaggerUI = require("swagger-ui-express");
const swaggerDocs = require("./swagger.json");
const helmet = require("helmet");
const morgan = require("morgan");
const { json } = require("body-parser");
const cors = require("cors");
const { queryParser } = require("express-query-parser");

const { config } = require("./config");
const { errorMiddleware } = require("./middlewares");
const {
  authRouter,
  userRouter,
  albumRouter,
  playlistRouter,
  trackRouter,
  genreRouter,
  searchRouter,
} = require("./routes");

const app = express();

// {
//   contentSecurityPolicy: {
//     directives: {
//       ...helmet.contentSecurityPolicy.getDefaultDirectives(),
//       ...(config?.deploy?.url && { "script-src": ["'self'", ""] }),
//     },
//   },
// }

app.use(morgan("dev"));
app.use(helmet());
app.use(json());
app.use(cors());
app.use(
  queryParser({
    parseNull: true,
    parseUndefined: true,
    parseBoolean: true,
    parseNumber: true,
  }),
);

app.use("/", authRouter);
app.use("/users", userRouter);
app.use("/albums", albumRouter);
app.use("/playlists", playlistRouter);
app.use("/tracks", trackRouter);
app.use("/genres", genreRouter);
app.use("/search", searchRouter);

app.get("/", (req, res) => res.redirect("/docs"));
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use("*", (req, res) => {
  res.status(404).send({
    success: false,
    message: "Resource not found",
  });
});

app.use(errorMiddleware);

module.exports = {
  app: app,
};
