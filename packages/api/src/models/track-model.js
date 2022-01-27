const { Schema, model, SchemaTypes } = require("mongoose");
const { isURL } = require("validator");

const TrackSchema = Schema(
  {
    user: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: "user",
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    color: {
      type: String,
      trim: true,
    },
    duration: {
      type: Number,
    },
    url_image: {
      type: String,
      trim: true,
      validate: {
        validator: (value) => (value ? isURL(value) : true),
        message: () => `Image URL is invalid`,
      },
    },
    url_image_thmb: {
      type: String,
      trim: true,
      validate: {
        validator: (value) => (value ? isURL(value) : true),
        message: () => `Image thumbnail URL is invalid`,
      },
    },
    genres: {
      type: [SchemaTypes.ObjectId],
      ref: "genre",
      trim: true,
    },
    num_plays: {
      type: Number,
      default: 0,
      min: 0,
    },
    num_likes: {
      type: Number,
      default: 0,
      min: 0,
    },
    liked_by: {
      type: [SchemaTypes.ObjectId],
      ref: "user",
      trim: true,
    },
    albums: {
      type: [SchemaTypes.ObjectId],
      ref: "album",
      trim: true,
    },
    released_at: {
      type: Date,
      required: true,
      trim: true,
    },
    deleted_at: {
      type: Date,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Track = model("track", TrackSchema);

module.exports = Track;
