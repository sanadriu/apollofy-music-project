const models = require("../models");
const { getRandomItems } = require("../utils");
const {
  createSampleUser,
  createSampleGenre,
  createSampleTrack,
  createSampleAlbum,
  createSamplePlaylist,
} = require("./samplers");

async function seedUserCollection(length = 1) {
  const users = Array.from({ length }, () => createSampleUser());

  return await models.User.insertMany(users).then((docs) => docs.map(({ id }) => id));
}

async function seedGenreCollection(length = 1) {
  const genres = Array.from({ length }, () => createSampleGenre());

  return await models.Genre.insertMany(genres).then((docs) => docs.map(({ name }) => name));
}

async function seedAlbumCollection(length = 1, users = [], genres = []) {
  if (users.length === 0) throw new Error("User list must not be empty");

  const albums = Array.from({ length }, () => createSampleAlbum(users, genres));

  return await models.Album.insertMany(albums).then((docs) => docs.map(({ id }) => id));
}

async function seedPlaylistCollection(length = 1, users = []) {
  if (users.length === 0) throw new Error("User list must not be empty");

  const playlists = Array.from({ length }, () => createSamplePlaylist(users));

  return await models.Playlist.insertMany(playlists).then((docs) => docs.map(({ id }) => id));
}

async function seedTrackCollection(length = 1, users = [], genres = []) {
  if (users.length === 0) throw new Error("User list must not be empty");

  const tracks = Array.from({ length }, () => createSampleTrack(users, genres));

  return await models.Track.insertMany(tracks).then((docs) => docs.map(({ id }) => id));
}

async function seedAlbumsWithTracks() {
  const albums = await models.Album.find();

  albums.forEach(async (album) => {
    const userTracks = await models.Track.find({ user: album.user });
    const randomTracks = getRandomItems(userTracks, userTracks.length).map((track) => track.id);

    album.tracks = randomTracks;
    await album.save({ validateBeforeSave: true });
  });
}

async function seedPlaylistsWithTracks() {
  const tracks = await models.Track.find();
  const playlists = await models.Playlist.find();

  playlists.forEach(async (playlist) => {
    const randomTracks = getRandomItems(tracks, 6).map((track) => track.id);

    playlist.tracks = randomTracks;
    await playlist.save({ validateBeforeSave: true });
  });
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

  await seedAlbumCollection(numAlbums, users, genres);
  await seedTrackCollection(numTracks, users, genres);
  await seedPlaylistCollection(numPlaylists, users);
  await seedAlbumsWithTracks();
  await seedPlaylistsWithTracks();
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
