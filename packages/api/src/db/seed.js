const log = require("../services/logger");
const models = require("../models");
const {
  createSampleUser,
  createSampleGenre,
  createSampleTrack,
  createSampleAlbum,
  createSamplePlaylist,
} = require("../utils/sample-generators");

const numUsers = 4;
const numGenres = 4;
const numTracks = 20;
const numAlbums = 4;
const numPlaylists = 2;

async function seedUserCollection(length = 1) {
  const users = Array.from({ length }, () => createSampleUser());

  return await models.User.insertMany(users).then((docs) =>
    docs.map(({ _id }) => _id),
  );
}

async function seedGenreCollection(length = 1) {
  const genres = Array.from({ length }, () => createSampleGenre());

  return await models.Genre.insertMany(genres).then((docs) =>
    docs.map(({ _id }) => _id),
  );
}

async function seedTrackCollection(length = 1, users = [], genres = []) {
  if (users.length === 0) throw new Error("User list must not be empty");
  if (genres.length === 0) throw new Error("Genre list must not be empty");

  const tracks = Array.from({ length }, () => createSampleTrack(users, genres));

  return await models.Track.insertMany(tracks).then((docs) =>
    docs.map(({ _id }) => _id),
  );
}

async function seedAlbumCollection(length = 1, users = [], genres = []) {
  if (users.length === 0) throw new Error("User list must not be empty");
  if (genres.length === 0) throw new Error("Genre list must not be empty");

  const albums = Array.from({ length }, () => createSampleAlbum(users, genres));

  return await models.Album.insertMany(albums).then((docs) =>
    docs.map(({ _id }) => _id),
  );
}

async function seedPlaylistCollection(length = 1, users = []) {
  if (users.length === 0) throw new Error("User list must not be empty");

  const playlists = Array.from({ length }, () => createSamplePlaylist(users));

  return await models.Playlist.insertMany(playlists).then((docs) =>
    docs.map(({ _id }) => _id),
  );
}

async function deleteCollections() {
  await models.User.deleteMany();
  await models.Genre.deleteMany();
  await models.Track.deleteMany();
  await models.Album.deleteMany();
  await models.Playlist.deleteMany();
}

async function seedCollections() {
  const users = await seedUserCollection(numUsers);
  const genres = await seedGenreCollection(numGenres);
  const tracks = await seedTrackCollection(numTracks, users, genres);
  const albums = await seedAlbumCollection(numAlbums, users, genres);
  const playlists = await seedPlaylistCollection(numPlaylists, users);
}

async function seed() {
  try {
    await deleteCollections();
    await seedCollections();
  } catch (error) {
    log.error(error.message);

    await deleteCollections();
  }
}

module.exports = seed;
