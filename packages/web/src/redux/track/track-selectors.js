import { createSelector } from "reselect";

export const selectTracks = (state) => state.tracks.ids;

export const selectTrack = (state, trackID) => state.tracks.byID[trackID];

export const selectTrackState = (state) => state.tracks;

export const tracksSelector = createSelector(
  [selectTrack],
  (tracksIDS) => tracksIDS,
);

export const trackSelector = createSelector([selectTrack], (track) => track);

export const trackStateSelector = createSelector(
  [selectTrackState],
  (trackState) => trackState,
);
