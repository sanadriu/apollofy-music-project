const { Schema, Types, model } = require("mongoose");
const { isURL } = require("validator");

const PlaylistSchema = new Schema(
  {
    user: {
      type: String,
      required: true,
      ref: "user",
      trim: true,
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    color: {
      type: String,
      trim: true,
    },
    tracks: {
      type: [Types.ObjectId],
      ref: "track",
    },
    followed_by: {
      type: [String],
      ref: "user",
    },
    thumbnails: {
      url_default: {
        type: String,
        trim: true,
        validate: {
          validator: (value) => (value ? isURL(value) : true),
          message: () => `URL for default thumbnail is invalid`,
        },
      },
      url_medium: {
        type: String,
        trim: true,
        validate: {
          validator: (value) => (value ? isURL(value) : true),
          message: () => `URL for medium thumbnail is invalid`,
        },
      },
      url_large: {
        type: String,
        trim: true,
        validate: {
          validator: (value) => (value ? isURL(value) : true),
          message: () => `URL for large thumbnail is invalid`,
        },
      },
    },
    deletedAt: {
      type: Date,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

PlaylistSchema.virtual("num_followers").get(function () {
  return this.followed_by.length;
});

PlaylistSchema.virtual("num_tracks").get(function () {
  return this.tracks.length;
});

const Playlist = model("playlist", PlaylistSchema);

module.exports = Playlist;
