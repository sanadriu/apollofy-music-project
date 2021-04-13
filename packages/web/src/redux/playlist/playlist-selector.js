import { createSelector } from "reselect";

export const selectPlaylists = (state) => state.playlists.ids;
export const selectPlaylist = (state, playlistID) =>
  state.playlists.byID[playlistID];
export const selectPlaylistState = (state) => state.playlists;

export const playlistsSelector = createSelector(
  [selectPlaylists],
  (playlistsIDS) => playlistsIDS,
);

export const playlistSelector = createSelector(
  [selectPlaylist],
  (playlist) => playlist,
);

export const playlistStateSelector = createSelector(
  [selectPlaylistState],
  (playlistState) => playlistState,
);
