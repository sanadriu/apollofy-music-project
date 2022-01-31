const { Schema, model, Types } = require("mongoose");
const { isURL, isDate } = require("validator");
const { getCryptoField } = require("../services/crypto");

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

/* Query Helpers */

TrackSchema.query.notDeleted = function () {
  return this.where({ deleted_at: { $exists: false } });
};

/* Statics */

TrackSchema.statics.getNumPages = function () {
  const limit = 10;

  return this.countDocuments()
    .notDeleted()
    .then((count) => {
      return Math.floor(count / limit) + (count % limit ? 1 : 0);
    });
};

TrackSchema.statics.getTracks = function (
  page = 1,
  sort = "created_at",
  order = "asc",
) {
  const limit = 10;
  const start = (page - 1) * limit;

  return this.find()
    .notDeleted()
    .sort({ [sort]: order })
    .skip(start)
    .limit(limit);
};

TrackSchema.statics.getTrack = function (id, extend = false) {
  const populate = [
    { path: "albums", match: { deleted_at: { $exists: false } } },
    { path: "genres", match: { deleted_at: { $exists: false } } },
    { path: "liked_by", match: { deleted_at: { $exists: false } } },
  ];

  return this.findById(id).notDeleted().populate(populate);
};

TrackSchema.statics.updateTrack = function (id, data) {
  const {
    thumbnails,
    title,
    url,
    released_date,
    color,
    genres,
    albums,
    duration,
  } = data;

  return this.findOneAndUpdate(
    { _id: id, deleted_at: { $exists: false } },
    {
      $set: {
        thumbnails,
        title,
        url,
        released_date,
        color,
        genres,
        albums,
        duration,
      },
    },
    {
      new: true,
      runValidators: true,
    },
  );
};

TrackSchema.statics.deleteTrack = function (id,track) {
  return this.findOneAndUpdate(
    { _id: id, deleted_at: { $exists: false } },
    {
      $set: {
        deleted_at: Date.now(),
        title: getCryptoField(track.title),
        url: getCryptoField(track.url),
        user: getCryptoField(track.user),
      },
    },
    {
      new: true,
    },
  );
};

const Track = model("track", TrackSchema);

module.exports = Track;
