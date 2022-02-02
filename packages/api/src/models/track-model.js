const { Schema, model } = require("mongoose");
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
      type: [String],
      trim: true,
    },
    liked_by: {
      type: [String],
      trim: true,
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

/* Virtual */

TrackSchema.virtual("num_likes").get(function () {
  return this.liked_by?.length;
});

/* Query Helpers */

TrackSchema.query.notDeleted = function () {
  return this.where({ deleted_at: { $exists: false } });
};

/* Population Object */

function getPopulate(extend = false) {
  return [
    {
      path: "user",
      match: { deleted_at: { $exists: false } },
      select: extend ? "username firstname lastname thumbnails" : "username",
    },
    {
      path: "liked_by",
      match: { deleted_at: { $exists: false } },
      select: "username",
    },
  ];
}

/* Statics */

TrackSchema.statics.getNumPages = function (limit = 10, filter = {}) {
  return this.countDocuments(filter)
    .notDeleted()
    .then((count) => {
      return Math.floor(count / limit) + (count % limit ? 1 : 0);
    });
};

TrackSchema.statics.getTrack = function (id, options = {}) {
  const { extend = false } = options;

  const populate = getPopulate(extend);

  return this.findById(id).notDeleted().populate(populate);
};

TrackSchema.statics.getTracks = function (options = {}) {
  const { page = 1, sort = "created_at", order = "asc", limit = 10, genre } = options;

  const start = (page - 1) * limit;

  const populate = getPopulate();
  const filter = genre ? { genres: { $in: [genre] } } : {};

  return this.find(filter)
    .notDeleted()
    .populate(populate)
    .sort({ [sort]: order })
    .skip(start)
    .limit(limit);
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

TrackSchema.statics.deleteTrack = function (id) {
  return this.findOneAndUpdate(
    { _id: id, deleted_at: { $exists: false } },
    { $set: { deleted_at: Date.now() } },
    { new: true },
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

TrackSchema.statics.getPlayed = async function (id) {
  return await this.findOneAndUpdate(
    { _id: id, deleted_at: { $exists: false } },
    { $inc: { num_plays: 1 } },
    { new: true, runValidators: true },
  );
};

TrackSchema.statics.getUserTracks = function (idUser, options = {}) {
  const { page = 1, sort = "created_at", order = "asc", extend = false } = options;

  const limit = 10;
  const start = (page - 1) * limit;

  const populate = getPopulate(extend);

  return this.find({ user: idUser })
    .notDeleted()
    .select("-user")
    .populate(populate)
    .sort({ [sort]: order })
    .skip(start)
    .limit(limit);
};

const Track = model("track", TrackSchema);

module.exports = Track;
