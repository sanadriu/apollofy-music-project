const { Schema, Types, model } = require("mongoose");
const { isEmail, isDate, isURL } = require("validator");

const UserSchema = Schema(
  {
    _id: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      required: [true, "The email is required"],
      trim: true,
      unique: true,
      validate: {
        validator: (value) => isEmail(value),
        message: (props) => `The email ${props.value} is not valid`,
      },
    },
    firstname: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    lastname: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 250,
    },
    birth_date: {
      type: String,
      trim: true,
      validate: {
        validator: (value) =>
          value ? isDate(value, { strictMode: true }) : true,
        message: () => `Date is not valid`,
      },
    },
    url_avatar: {
      type: String,
      trim: true,
      validate: {
        validator: (value) => (value ? isURL(value) : true),
        message: () => `Image thumbnail URL is invalid`,
      },
    },
    liked_albums: {
      type: [Types.ObjectId],
      ref: "album",
    },
    liked_tracks: {
      type: [Types.ObjectId],
      ref: "track",
    },
    followed_playlists: {
      type: [Types.ObjectId],
      ref: "playlist",
    },
    followed_users: {
      type: [Types.ObjectId],
      ref: "user",
    },
    followers: {
      type: [Types.ObjectId],
      ref: "user",
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

UserSchema.virtual("num_liked_albums").get(function () {
  return this.liked_albums.length();
});

UserSchema.virtual("num_liked_tracks").get(function () {
  return this.liked_tracks.length();
});

UserSchema.virtual("num_followed_playlists").get(function () {
  return this.followed_playlists.length();
});

UserSchema.virtual("num_followed_users").get(function () {
  return this.followed_users.length();
});

UserSchema.virtual("num_followers").get(function () {
  return this.followers.length();
});

const User = model("user", UserSchema);

module.exports = User;
