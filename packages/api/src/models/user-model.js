const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const { isEmail } = require("validator");

const UserSchema = Schema(
  {
    // we use the uid from firebase as the _id
    _id: String,
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    num_liked_Albums: {
      type: Number,
      default: 0,
    },
    num_liked_tracks: {
      type: Number,
      default: 0,
    },
    num_followed_playlists: {
      type: Number,
      default: 0,
    },
    num_followed_users: {
      type: Number,
      default: 0,
    },
    num_followers: {
      type: Number,
      default: 0,
    },
    liked_albums: {
      type: [mongoose.Types.ObjectId],
      ref: "album",
    },
    liked_tracks: {
      type: [mongoose.Types.ObjectId],
      ref: "track",
    },
    followed_playlists: {
      type: [mongoose.Types.ObjectId],
      ref: "playlist",
    },
    followed_users: {
      type: [mongoose.Types.ObjectId],
      ref: "user",
    },
    followers: {
      type: [mongoose.Types.ObjectId],
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
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("user", UserSchema);

module.exports = User;
