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
    deletedAt: {
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

PlaylistSchema.virtual("num_followers").get(function () {
  return this.followed_by.length;
});

PlaylistSchema.virtual("num_tracks").get(function () {
  return this.tracks.length;
});

/* Query Helpers */

PlaylistSchema.query.notDeleted = function () {
  return this.where({ deleted_at: { $exists: false } });
};

/* Statics */

PlaylistSchema.statics.getNumPages = function () {
  const limit = 10;

  return this.countDocuments()
    .notDeleted()
    .then((count) => {
      return Math.floor(count / limit) + (count % limit ? 1 : 0);
    });
};

PlaylistSchema.statics.getPlaylist = function (id, extend = false) {
  const populate = [
    {
      path: "tracks",
      match: { deleted_at: { $exists: false } },
    },
    {
      path: "followed_by",
      match: { deleted_at: { $exists: false } },
    },
  ];

  return this.findById(id)
    .notDeleted()
    .populate(extend ? populate : undefined);
};

PlaylistSchema.statics.getPlaylists = function (page = 1, sort = "created_at", order = "asc") {
  const limit = 10;
  const start = (page - 1) * limit;

  return this.find()
    .notDeleted()
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

PlaylistSchema.statics.getUserPlaylists = function (uid){
  return this.find({})
    .where("user")
    .equals(uid)
    .notDeleted()
    .populate({ path: "tracks followed_by"});
}

const Playlist = model("playlist", PlaylistSchema);

module.exports = Playlist;
