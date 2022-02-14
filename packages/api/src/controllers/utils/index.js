const { Track } = require("../../models");

async function filterUserTracks(idUser, idTracks) {
  const tracks =
    idTracks instanceof Array
      ? await Promise.all(idTracks.map((id) => Track.getTrack(id)))
      : [await Track.getTrack(id)];

  return tracks.filter((track) => track.user !== idUser).map((track) => track.id);
}

module.exports = {
  filterUserTracks,
};
