const { Track } = require("../../models");

function getUserProfile({ id, email, username, firstname, lastname }) {
  return { id, email, username, firstname, lastname };
}

async function filterUserTracks(idUser, idTracks) {
  const tracks =
    idTracks instanceof Array
      ? await Promise.all(idTracks.map((id) => Track.getTrack(id)))
      : [await Track.getTrack(id)];

  return tracks.filter((track) => track.user !== idUser).map((track) => track.id);
}

module.exports = {
  getUserProfile,
  filterUserTracks,
};
