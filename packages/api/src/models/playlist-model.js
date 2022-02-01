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
      required: true,
      trim: true,
      maxlength: 50,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 250,
    },
    color: {
      type: String,
      trim: true,
      maxlength: 50,
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

PlaylistSchema.virtual("num_followers").get(function () {
  return this.followed_by?.length;
});

PlaylistSchema.virtual("num_tracks").get(function () {
  return this.tracks?.length;
});

/* Query Helpers */

PlaylistSchema.query.notDeleted = function () {
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
      path: "tracks",
      match: { deleted_at: { $exists: false } },
      select: extend ? "title url duration color release_date num_likes num_plays user" : "title",
      ...(extend && {
        populate: {
          path: "user",
          match: { deleted_at: { $exists: false } },
          select: extend ? "username firstname lastname thumbnails" : "username",
        },
      }),
    },
    {
      path: "followed_by",
      match: { deleted_at: { $exists: false } },
      select: extend ? "username" : "id",
    },
  ];
}

/* Statics */

PlaylistSchema.statics.getNumPages = function (filter = {}) {
  const limit = 10;

  return this.countDocuments(filter)
    .notDeleted()
    .then((count) => {
      return Math.floor(count / limit) + (count % limit ? 1 : 0);
    });
};

PlaylistSchema.statics.getPlaylist = function (id, options) {
  const { extend = false } = options;

  const populate = getPopulate(extend);

  return this.findById(id).notDeleted().populate(populate);
};

PlaylistSchema.statics.getPlaylists = function (options) {
  const { page = 1, sort = "created_at", order = "asc" } = options;

  const limit = 10;
  const start = (page - 1) * limit;

  const populate = getPopulate();

  return this.find()
    .notDeleted()
    .populate(populate)
    .sort({ [sort]: order })
    .skip(start)
    .limit(limit);
};

PlaylistSchema.statics.createPlaylist = function (idUser, data) {
  const { title, description, color, tracks, thumbnails } = data;

  return this.create({
    user: idUser,
    title,
    description,
    color,
    tracks,
    thumbnails,
  });
};

PlaylistSchema.statics.updatePlaylist = function (id, data) {
  const { title, description, color, tracks, thumbnails } = data;

  return this.findOneAndUpdate(
    { _id: id, deleted_at: { $exists: false } },
    { $set: { title, description, color, tracks, thumbnails } },
    { new: true, runValidators: true },
  );
};

PlaylistSchema.statics.deletePlaylist = function (id) {
  return this.findOneAndUpdate(
    { _id: id, deleted_at: { $exists: false } },
    { $set: { deleted_at: Date.now() } },
    { new: true },
  );
};

PlaylistSchema.statics.switchValueInList = async function (id, listName, value) {
  const playlist = await this.findById(id).notDeleted();

  if (!playlist) return null;

  if (playlist[listName].indexOf(value) === -1) {
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

PlaylistSchema.statics.getFollowed = async function (id, idUser) {
  return await this.switchValueInList(id, "followed_by", idUser);
};

PlaylistSchema.statics.getUserPlaylists = function (idUser, options) {
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

const Playlist = model("playlist", PlaylistSchema);

module.exports = Playlist;
