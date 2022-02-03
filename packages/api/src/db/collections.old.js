const { model } = require("mongoose");
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
  const tracks = await models.Track.find();

  tracks.forEach(async (track) => {
    const userAlbums = await models.Album.find({ user: track.user });

    userAlbums.forEach(async (album) => {
      if (Math.random() < 0.25) {
        await album.update({ $push: { tracks: track.id } });
        await album.save({ validateBeforeSave: true });
      }
    });
  });
}

async function seedPlaylistsWithTracks() {
  const tracks = await models.Track.find();
  const playlists = await models.Playlist.find();

  tracks.forEach(async (track) => {
    playlists.forEach(async (playlist) => {
      if (Math.random() < 0.25) {
        await playlist.update({ $push: { tracks: track.id } });
        await playlist.save({ validateBeforeSave: true });
      }
    });
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
  const albums = await seedAlbumCollection(numAlbums, users, genres);
  const tracks = await seedTrackCollection(numTracks, users, genres);
  const playlists = await seedPlaylistCollection(numPlaylists, users);
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
