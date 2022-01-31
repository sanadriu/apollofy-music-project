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
      maxlength: 50,
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

AlbumSchema.virtual("num_likes").get(function () {
  return this.liked_by.length;
});

AlbumSchema.virtual("num_tracks").get(function () {
  return this.tracks.length;
});

/* Query Helpers */

AlbumSchema.query.notDeleted = function () {
  return this.where({ deleted_at: { $exists: false } });
};

/* Statics */

AlbumSchema.statics.getNumPages = function () {
  const limit = 10;

  return this.countDocuments()
    .notDeleted()
    .then((count) => {
      return Math.floor(count / limit) + (count % limit ? 1 : 0);
    });
};

AlbumSchema.statics.getAlbum = function (id, extend = false) {
  const populate = [
    {
      path: "tracks",
      match: { deleted_at: { $exists: false } },
    },
    {
      path: "genres",
      match: { deleted_at: { $exists: false } },
    },
    {
      path: "liked_by",
      match: { deleted_at: { $exists: false } },
    },
  ];

  return this.findById(id)
    .notDeleted()
    .populate(extend ? populate : undefined);
};

AlbumSchema.statics.getAlbums = function (page = 1, sort = "created_at", order = "asc") {
  const limit = 10;
  const start = (page - 1) * limit;

  return this.find()
    .notDeleted()
    .sort({ [sort]: order })
    .skip(start)
    .limit(limit);
};

AlbumSchema.statics.createAlbum = function (idUser, data) {
  const { title, year, genres, tracks, thumbnails } = data;

  return this.create({
    user: idUser,
    title,
    year,
    genres,
    tracks,
    thumbnails,
  });
};

AlbumSchema.statics.updateAlbum = function (id, data) {
  const { title, year, genres, tracks, thumbnails } = data;

  return this.findOneAndUpdate(
    { _id: id, deleted_at: { $exists: false } },
    { $set: { title, year, genres, tracks, thumbnails } },
    { new: true, runValidators: true },
  );
};

AlbumSchema.statics.deleteAlbum = function (id) {
  return this.findOneAndUpdate(
    { _id: id, deleted_at: { $exists: false } },
    { $pull: { [listName]: value } },
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

const Album = model("album", AlbumSchema);

module.exports = Album;
