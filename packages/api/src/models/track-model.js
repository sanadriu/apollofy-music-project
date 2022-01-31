const { Schema, model, Types } = require("mongoose");
const { isURL, isDate } = require("validator");

const TrackSchema = new Schema(
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
    url: {
      type: String,
      trim: true,
      validate: {
        validator: (value) => (value ? isURL(value) : true),
        message: () => `URL for song is invalid`,
      },
    },
    duration: {
      type: Number,
      required: true,
      min: 0,
    },
    released_date: {
      type: String,
      trim: true,
      validate: {
        validator: (value) =>
          value
            ? isDate(value, { strictMode: true, format: "YYYY-MM-DD" })
            : true,
        message: () => `Date is not valid`,
      },
    },
    color: {
      type: String,
      trim: true,
    },
    genres: {
      type: [Types.ObjectId],
      ref: "genre",
    },
    albums: {
      type: [Types.ObjectId],
      ref: "album",
    },
    liked_by: {
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
    num_plays: {
      type: Number,
      default: 0,
      min: 0,
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
  return this.liked_by.length;
});

const Track = model("track", TrackSchema);

module.exports = Track;
