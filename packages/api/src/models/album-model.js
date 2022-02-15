const { Schema, Types, model } = require("mongoose");
const { isURL, isDate } = require("validator");

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
      maxlength: 50,
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
    genres: {
      type: [Types.ObjectId],
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

AlbumSchema.virtual("num_likes").get(function () {
  return this.liked_by?.length;
});

AlbumSchema.virtual("num_tracks").get(function () {
  return this.tracks?.length;
});

/* Query Helpers */

AlbumSchema.query.notDeleted = function () {
  return this.where({ deleted_at: { $exists: false } });
};

/* Population Object */

function getPopulate(extend) {
  return [
    {
      path: "user",
      match: { deleted_at: { $exists: false } },
      select: "username",
    },
    {
      path: "tracks",
      match: { deleted_at: { $exists: false } },
      select: extend ? "title url duration color release_date num_likes num_plays" : "title",
    },
    {
      path: "liked_by",
      match: { deleted_at: { $exists: false } },
      select: "username",
    },
  ];
}
/* Statics */

AlbumSchema.statics.getNumPages = function (limit = 10, filter = {}) {
  return this.countDocuments(filter)
    .notDeleted()
    .then((count) => {
      return Math.floor(count / limit) + (count % limit ? 1 : 0);
    });
};

AlbumSchema.statics.getAlbum = function (id, options = {}) {
  const { extend = false } = options;

  const populate = getPopulate(extend);

  return this.findById(id).notDeleted().populate(populate);
};

AlbumSchema.statics.getAlbums = function (options = {}) {
  const { page = 1, sort = "created_at", order = "asc", limit = 10, filter = {} } = options;

  const start = (page - 1) * limit;

  const populate = getPopulate();

  return this.find(filter)
    .notDeleted()
    .populate(populate)
    .sort({ [sort]: order })
    .skip(start)
    .limit(limit);
};

AlbumSchema.statics.createAlbum = function (idUser, data) {
  const { title, released_date, genres, tracks, thumbnails } = data;

  return this.create({
    user: idUser,
    title,
    released_date,
    genres,
    tracks,
    thumbnails,
  });
};

AlbumSchema.statics.updateAlbum = function (id, data) {
  const { title, released_date, genres, tracks, thumbnails } = data;

  return this.findOneAndUpdate(
    { _id: id, deleted_at: { $exists: false } },
    { $set: { title, released_date, genres, tracks, thumbnails } },
    { new: true, runValidators: true },
  );
};

AlbumSchema.statics.deleteAlbum = function (id) {
  return this.findOneAndUpdate(
    { _id: id, deleted_at: { $exists: false } },
    { $set: { deleted_at: Date.now() } },
    { new: true },
  );
};

AlbumSchema.statics.switchValueInList = async function (id, listName, value) {
  const album = await this.findById(id).notDeleted();

  if (!album) return null;

  if (album[listName].indexOf(value) === -1) {
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

AlbumSchema.statics.getLiked = async function (id, idUser) {
  return await this.switchValueInList(id, "liked_by", idUser);
};

AlbumSchema.statics.getUserAlbums = function (idUser, options = {}) {
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

const Album = model("album", AlbumSchema);

module.exports = Album;
