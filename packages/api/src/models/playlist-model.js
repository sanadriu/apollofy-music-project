const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const PlaylistSchema = Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: [true, "User is required"],
    },
    name: {
      type: String,
      trim: true,
      required: [true, "This name is required"],
    },
    description: {
      type: String,
      trim: true,
    },
    color: {
      type: String,
      trim: true,
    },
    url_image: {
      type: String,
      trim: true,
    },
    url_image_thumb: {
      type: String,
      trim: true,
    },
    num_tracks: {
      type: Number,
      default: 0,
    },
    num_followers: {
      type: Number,
      default: 0,
    },
    tracks: {
      type: [mongoose.Types.ObjectId],
      ref: "track",
    },
    followed_by: {
      type: [mongoose.Types.ObjectId],
      ref: "user",
    },
    deletedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

const Playlist = mongoose.model("playlist", PlaylistSchema);

module.exports = Playlist;
