import * as SearchTypes from "./search-types";

export const SearchInitState = {
  searchLoading: false,
  searchLoadingError: null,
  searchFetched: false,
  usersByID: {},
  usersIds: [],
  playlistsByID: {},
  playlistsIds: [],
  tracksByID: {},
  tracksIds: [],
};

const searchReducer = (state = SearchInitState, action) => {
  switch (action.type) {
    case SearchTypes.FETCH_QUERY_REQUEST: {
      return {
        ...state,
        searchFetched: true,
        searchFetchedError: null,
      };
    }
    case SearchTypes.FETCH_QUERY_ERROR: {
      return {
        ...state,
        searchFetched: false,
        searchFetchedError: action.payload,
      };
    }
    case SearchTypes.FETCH_QUERY_SUCCESS: {
      return {
        ...state,
        searchLoading: false,
        searchLoadingError: null,
        searchFetched: true,
        usersByID: action.payload.usersByID,
        usersIds: action.payload.usersIds,
        playlistsByID: action.payload.playlistsByID,
        playlistsIds: action.payload.playlistsIds,
        tracksByID: action.payload.tracksByID,
        tracksIds: action.payload.tracksIds,
      };
    }
    default: {
      return state;
    }
  }
};

export default searchReducer;
