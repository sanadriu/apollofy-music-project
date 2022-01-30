const { Schema, Types, model } = require("mongoose");
const { isURL } = require("validator");

const AlbumSchema = new Schema(
  {
    user: {
      type: String,
      required: true,
      ref: "user",
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    year: {
      type: Number,
      required: true,
      trim: true,
    },
    genres: {
      type: [Types.ObjectId],
      ref: "genre",
      trim: true,
    },
    tracks: {
      type: [Types.ObjectId],
      ref: "track",
      trim: true,
    },
    liked_by: {
      type: [String],
      ref: "user",
      trim: true,
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

    deleted_at: {
      type: Date,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

AlbumSchema.virtual("num_likes").get(function () {
  return this.liked_by.length;
});

AlbumSchema.virtual("num_tracks").get(function () {
  return this.tracks.length;
});

const Album = model("album", AlbumSchema);

module.exports = Album;
