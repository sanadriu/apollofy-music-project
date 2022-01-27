const { Schema, model } = require("mongoose");
const { isURL } = require("validator");

const ThumbnailsSchema = new Schema({});

const GenreSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
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
    timestamps: true,
    versionKey: false,
  },
);

const Genre = model("genre", GenreSchema);

module.exports = Genre;
