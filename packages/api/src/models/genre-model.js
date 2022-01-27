const { Schema, model } = require("mongoose");
const { isURL } = require("validator");

const GenreSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    url_image: {
      type: String,
      trim: true,
      validate: {
        validator: (value) => (value ? isURL(value) : true),
        message: () => `Image URL is invalid`,
      },
    },
    url_thumbnail: {
      type: String,
      trim: true,
      validate: {
        validator: (value) => (value ? isURL(value) : true),
        message: () => `Image thumbnail URL is invalid`,
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
