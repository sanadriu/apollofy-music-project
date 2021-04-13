import api from "../../api";
import * as SearchTypes from "./search-types";
import { normalizeUsers } from "../../schema/user-schema";
import { normalizeTracks } from "../../schema/track-schema";
import { normalizePlaylists } from "../../schema/playlist-schema";

export const queryRequest = () => ({
  type: SearchTypes.FETCH_QUERY_REQUEST,
});

export const queryError = (message) => ({
  type: SearchTypes.FETCH_QUERY_ERROR,
  payload: message,
});

export const querySuccess = (data) => ({
  type: SearchTypes.FETCH_QUERY_SUCCESS,
  payload: data,
});

export function doSearch(query) {
  return async function doSearchThunk(dispatch) {
    dispatch(queryRequest());

    const res = await api.search({ query: query });

    if (res.isSuccessful) {
      const normalizedUsers = normalizeUsers(res.data);
      const normalizedPlaylists = normalizePlaylists(res.data);
      const normalizedTracks = normalizeTracks(res.data);
      dispatch(
        querySuccess({
          usersByID: normalizedUsers.entities.users,
          usersIds: normalizedUsers.result,
          playlistsByID: normalizedPlaylists.entities.playlists,
          playlistsIds: normalizedPlaylists.result,
          tracksByID: normalizedTracks.entities.tracks,
          tracksIds: normalizedTracks.result,
        }),
      );
    } else {
      dispatch(queryError(res.errorMessage));
    }
  };
}
