const { Schema, model, Types } = require("mongoose");
const { isURL, isDate } = require("validator");
const { getHash } = require("../services/crypto");

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
      maxlength: 50,
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
          value ? isDate(value, { strictMode: true, format: "YYYY-MM-DD" }) : true,
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
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        ret.id = ret._id;

        delete ret._id;
      },
    },
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

TrackSchema.statics.getTracks = function (page = 1, sort = "created_at", order = "asc") {
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
    { path: "genres", match: { deleted_at: { $exists: false } } },
    { path: "liked_by", match: { deleted_at: { $exists: false } } },
  ];

  return this.findById(id)
    .notDeleted()
    .populate(extend ? populate : undefined);
};

TrackSchema.statics.createTrack = function (idUser, data) {
  const { title, url, released_date, color, genres, duration, thumbnails } = data;

  return this.create({
    user: idUser,
    title,
    url,
    released_date,
    color,
    genres,
    duration,
    thumbnails,
  });
};

TrackSchema.statics.updateTrack = function (id, data) {
  const { title, url, released_date, color, genres, duration, thumbnails } = data;

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
        duration,
      },
    },
    {
      new: true,
      runValidators: true,
    },
  );
};

TrackSchema.statics.deleteTrack = function (id, track) {
  return this.findOneAndUpdate(
    { _id: id, deleted_at: { $exists: false } },
    {
      $set: {
        deleted_at: Date.now(),
        title: getHash(track.title),
        url: getHash(track.url),
        user: getHash(track.user),
      },
    },
    {
      new: true,
    },
  );
};

TrackSchema.statics.switchValueInList = async function (id, listName, value) {
  const user = await this.findById(id).notDeleted();

  if (!user) return null;

  if (user[listName].indexOf(value) === -1) {
    return await this.findOneAndUpdate(
      { _id: id, deleted_at: { $exists: false } },
      { $push: { [listName]: value } },
      { new: true, runValidators: true },
    );
  } else {
    return await this.findOneAndUpdate(
      { _id: id, deleted_at: { $exists: false } },
      { $pull: { [listName]: value } },
      { new: true, runValidators: true },
    );
  }
};

TrackSchema.statics.getLiked = async function (id, idUser) {
  return await this.switchValueInList(id, "liked_by", idUser);
};

const Track = model("track", TrackSchema);

module.exports = Track;
