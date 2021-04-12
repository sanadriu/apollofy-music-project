import { createSelector } from "reselect";

export const selectGenres = (state) => state.genres.ids;

export const selectGenreState = (state) => state.genres;

export const selectGenre = (state, id) => state.genres.byID[id];

export const genresSelector = createSelector(
  [selectGenres],
  (genresIDS) => genresIDS,
);

export const genreSelector = createSelector([selectGenre], (genre) => genre);

export const genreStateSelector = createSelector(
  [selectGenreState],
  (genreState) => genreState,
);
