import { createSelector } from "reselect";

export const selectUsers = (state) => state.search.usersIds;
export const selectUser = (state, userID) => state.search.usersByID[userID];
export const selectPlaylists = (state) => state.search.playlistsIds;
export const selectPlaylist = (state, playlistID) =>
  state.search.playlistsByID[playlistID];
export const selectTracks = (state) => state.search.tracksIds;
export const selectTrack = (state, trackID) => state.search.tracksByID[trackID];
export const selectSearchState = (state) => state.search;

export const usersSelector = createSelector(
  [selectUsers],
  (usersIDS) => usersIDS,
);

export const userSelector = createSelector([selectUser], (user) => user);

export const playlistsSelector = createSelector(
  [selectPlaylists],
  (playlistsIDS) => playlistsIDS,
);

export const playlistSelector = createSelector(
  [selectPlaylist],
  (playlist) => playlist,
);

export const tracksSelector = createSelector(
  [selectTracks],
  (tracksIDS) => tracksIDS,
);

export const trackSelector = createSelector([selectTrack], (track) => track);

export const searchStateSelector = createSelector(
  [selectSearchState],
  (searchState) => searchState,
);
