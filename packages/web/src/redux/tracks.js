import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

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
  }
})

export const {
  trackAdded,
} = slice.actions;

export default slice.reducer;

// functions

export const addTrack = (track) => (dispatch) => {
  return dispatch(trackAdded(track));
}

// selector

export const selectTracksState = (state) => state.entities.tracks;

export const tracksSelector = createSelector(
  [selectTracksState],
  (tracks) => tracks
);
