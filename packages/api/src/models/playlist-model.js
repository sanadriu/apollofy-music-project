const { Schema, Types, model } = require("mongoose");
const { isURL } = require("validator");

const PlaylistSchema = Schema(
  {
    user: {
      type: Types.ObjectId,
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
      validate: {
        validator: (value) => (value ? isURL(value) : true),
        message: () => `Image thumbnail URL is invalid`,
      },
    },
    url_image_thumb: {
      type: String,
      trim: true,
      validate: {
        validator: (value) => (value ? isURL(value) : true),
        message: () => `Image thumbnail URL is invalid`,
      },
    },
    num_tracks: {
      type: Number,
      default: 0,
      min: 0,
    },
    num_followers: {
      type: Number,
      default: 0,
      min: 0,
    },
    tracks: {
      type: [Types.ObjectId],
      ref: "track",
    },
    followed_by: {
      type: [Types.ObjectId],
      ref: "user",
    },
    deletedAt: {
      type: Date,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Playlist = model("playlist", PlaylistSchema);

module.exports = Playlist;
