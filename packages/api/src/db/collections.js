const models = require("../models");
const {
  createSampleUser,
  createSampleGenre,
  createSampleTrack,
  createSampleAlbum,
  createSamplePlaylist,
} = require("./samplers");

async function seedUserCollection(length = 1) {
  const users = Array.from({ length }, () => createSampleUser());

  return await models.User.insertMany(users).then((docs) => docs.map(({ _id }) => _id));
}

async function seedGenreCollection(length = 1) {
  const genres = Array.from({ length }, () => createSampleGenre());

  return await models.Genre.insertMany(genres).then((docs) => docs.map(({ _id }) => _id));
}

async function seedTrackCollection(length = 1, users = [], genres = []) {
  if (users.length === 0) throw new Error("User list must not be empty");
  if (genres.length === 0) throw new Error("Genre list must not be empty");

  const tracks = Array.from({ length }, () => createSampleTrack(users, genres));

  return await models.Track.insertMany(tracks).then((docs) => docs.map(({ _id }) => _id));
}

async function seedAlbumCollection(length = 1, users = [], genres = []) {
  if (users.length === 0) throw new Error("User list must not be empty");
  if (genres.length === 0) throw new Error("Genre list must not be empty");

  const albums = Array.from({ length }, () => createSampleAlbum(users, genres));

  return await models.Album.insertMany(albums).then((docs) => docs.map(({ _id }) => _id));
}

async function seedPlaylistCollection(length = 1, users = []) {
  if (users.length === 0) throw new Error("User list must not be empty");

  const playlists = Array.from({ length }, () => createSamplePlaylist(users));

  return await models.Playlist.insertMany(playlists).then((docs) => docs.map(({ _id }) => _id));
}

async function deleteCollections() {
  await models.User.deleteMany();
  await models.Genre.deleteMany();
  await models.Track.deleteMany();
  await models.Album.deleteMany();
  await models.Playlist.deleteMany();
}

async function seedCollections() {
  const numUsers = 20;
  const numGenres = 6;
  const numTracks = 80;
  const numAlbums = 12;
  const numPlaylists = 12;

  const users = await seedUserCollection(numUsers);
  const genres = await seedGenreCollection(numGenres);

  await seedTrackCollection(numTracks, users, genres);
  await seedAlbumCollection(numAlbums, users, genres);
  await seedPlaylistCollection(numPlaylists, users);
}

module.exports = {
  seedUserCollection,
  seedGenreCollection,
  seedTrackCollection,
  seedAlbumCollection,
  seedPlaylistCollection,
  deleteCollections,
  seedCollections,
};
