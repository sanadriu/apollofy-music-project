import * as SessionTypes from "./genre-types";

export const GenreInitState = {
  genresLoading: false,
  genresLoadingError: null,
  genresFetched: false,
  byID: {},
  ids: [],
};

const GenreReducer = (state = GenreInitState, action) => {
  switch (action.type) {
    case SessionTypes.FETCH_GENRES_REQUEST: {
      return {
        ...state,
        genresLoading: true,
        genresLoadingError: null,
      };
    }
    case SessionTypes.FETCH_GENRES_ERROR: {
      return {
        ...state,
        genresLoading: false,
        genresLoadingError: action.payload,
      };
    }
    case SessionTypes.FETCH_GENRES_SUCCESS: {
      return {
        ...state,
        genresLoading: false,
        genresLoadingError: null,
        genresFetched: true,
        byID: action.payload.byID,
        ids: action.payload.ids,
      };
    }
    default: {
      return state;
    }
  }
};

export default GenreReducer;
