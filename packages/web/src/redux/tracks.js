import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

/* eslint no-param-reassign: ["error", { "props": false }] */

// slice

const slice = createSlice({
  name: "tracks",
  initialState: {
    list: [],
    isPlaying: false
  },
  reducers: {
    trackAdded: (tracks, action) => {
      tracks.list.push(action.payload);
      tracks.isPlaying = false;
    },

    trackPlaying: (tracks, action) => {
      tracks.list = [];
      tracks.list.push(action.payload);
      // tracks.list = [action.payload];
      tracks.isPlaying = true;
    },

    isPlaying: (tracks, action) => {
      tracks.isPlaying = true;
    }
  }
})

export const {
  trackAdded,
  trackPlaying,
  isPlaying,
} = slice.actions;

export default slice.reducer;

// functions

export const addTrack = (track) => (dispatch) => {
  return dispatch(trackAdded(track));
}

export const playTrack = (track) => (dispatch) => {
  return dispatch(trackPlaying(track));
}

export const playingIs = (track) => (dispatch) => {
  return dispatch(isPlaying(track));
}

// selector

export const selectTracksState = (state) => state.entities.tracks;

export const tracksSelector = createSelector(
  [selectTracksState],
  (tracks) => tracks
);
