const { Schema, Types, model } = require("mongoose");
const { isEmail } = require("validator");

const UserSchema = Schema(
  {
    _id: String,
    firstname: {
      type: String,
      trim: true,
    },
    lastname: {
      type: String,
      trim: true,
    },
    url_avatar: {
      type: String,
      trim: true,
      validate: {
        validator: (value) => (value ? isURL(value) : true),
        message: () => `Image thumbnail URL is invalid`,
      },
    },
    num_liked_albums: {
      type: Number,
      default: 0,
      min: 0,
    },
    num_liked_tracks: {
      type: Number,
      default: 0,
      min: 0,
    },
    num_followed_playlists: {
      type: Number,
      default: 0,
      min: 0,
    },
    num_followed_users: {
      type: Number,
      default: 0,
      min: 0,
    },
    num_followers: {
      type: Number,
      default: 0,
      min: 0,
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
    deleted_at: {
      type: Date,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const User = model("user", UserSchema);

module.exports = User;
