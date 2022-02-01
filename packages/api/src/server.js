const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const { json } = require("body-parser");
const cors = require("cors");

const { config } = require("./config");
const { errorMiddleware } = require("./middlewares");
const {
  authRouter,
  userRouter,
  albumRouter,
  playlistRouter,
  trackRouter,
  genreRouter,
} = require("./routes");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(json());
app.use(cors({ origin: config.client.url }));

app.use("/", authRouter);
app.use("/users", userRouter);
app.use("/albums", albumRouter);
app.use("/playlists", playlistRouter);
app.use("/tracks", trackRouter);
app.use("/genres", genreRouter);

app.get("/", (req, res) => {
  res.status(200).send({
    data: "hello-world",
  });
});

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
