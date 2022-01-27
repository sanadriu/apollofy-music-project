const { Schema, model, Types } = require("mongoose");
const { isURL } = require("validator");

const TrackSchema = Schema(
  {
    user: {
      type: Types.ObjectId,
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
    url_thumbnail: {
      type: String,
      trim: true,
      validate: {
        validator: (value) => (value ? isURL(value) : true),
        message: () => `Image thumbnail URL is invalid`,
      },
    },
    genres: {
      type: [Types.ObjectId],
      ref: "genre",
      trim: true,
    },
    num_plays: {
      type: Number,
      default: 0,
      min: 0,
    },
    liked_by: {
      type: [Types.ObjectId],
      ref: "user",
      trim: true,
    },
    albums: {
      type: [Types.ObjectId],
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
    versionKey: false,
  },
);

TrackSchema.virtual("num_likes").get(function () {
  return this.liked_by.length();
});

const Track = model("track", TrackSchema);

module.exports = Track;
