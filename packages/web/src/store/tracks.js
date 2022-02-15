import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

/* eslint no-param-reassign: ["error", { "props": false }] */

// slice

const slice = createSlice({
  name: "tracks",
  initialState: {
    list: [],
  },
  reducers: {
    trackAdded: (tracks, action) => {
      tracks.list.push(action.payload);
    },
    playTrackAdded: (tracks, action) => {
      tracks.list = [action.payload];
      // tracks.list.unshift(action.payload);
    },
  },
});

export const { trackAdded, playTrackAdded } = slice.actions;

export default slice.reducer;

// functions
export const playTrack = (track) => (dispatch) => {
  return dispatch(playTrackAdded(track));
};

export const addTrack = (track) => (dispatch) => {
  return dispatch(trackAdded(track));
};

// selector

export const selectTracksState = (state) => state.entities.tracks;

export const tracksSelector = createSelector([selectTracksState], (tracks) => tracks);
