/* eslint-disable no-console */
import * as PlaylistTypes from "./playlist-types";
import { playlistTypes } from "./playlist-types";
import api from "../../api";
import {
  normalizePlaylists,
  normalizeFullPlaylists,
} from "../../schema/playlist-schema";
import { getCurrentUserToken } from "../../services/auth";

export const playlistCreateRequest = () => ({
  type: PlaylistTypes.CREATE_PLAYLIST_REQUEST,
});

export const playlistCreateError = (message) => ({
  type: PlaylistTypes.CREATE_PLAYLIST_ERROR,
  payload: message,
});

export const playlistCreateSuccess = (data) => ({
  type: PlaylistTypes.CREATE_PLAYLIST_SUCCESS,
  payload: data,
});

export const playlistUpdateRequest = () => ({
  type: PlaylistTypes.UPDATE_PLAYLIST_REQUEST,
});

export const playlistUpdateError = (message) => ({
  type: PlaylistTypes.UPDATE_PLAYLIST_ERROR,
  payload: message,
});

export const playlistUpdateSuccess = (data) => ({
  type: PlaylistTypes.UPDATE_PLAYLIST_SUCCESS,
  payload: data,
});

export const fetchPlaylistsRequest = () => ({
  type: PlaylistTypes.FETCH_PLAYLISTS_REQUEST,
});

export const fetchPlaylistsError = (message) => ({
  type: PlaylistTypes.FETCH_PLAYLISTS_ERROR,
  payload: message,
});

export const fetchPlaylistsSuccess = ({
  fetchType = playlistTypes.ALL,
  byID,
  ids,
}) => ({
  type: PlaylistTypes.FETCH_PLAYLISTS_SUCCESS,
  payload: {
    byID: byID,
    ids: ids,
    type: fetchType,
  },
});

export const fetchPlaylistRequest = () => ({
  type: PlaylistTypes.FETCH_PLAYLIST_REQUEST,
});

export const fetchPlaylistError = (message) => ({
  type: PlaylistTypes.FETCH_PLAYLIST_ERROR,
  payload: message,
});

export const fetchPlaylistSuccess = (playlist) => ({
  type: PlaylistTypes.FETCH_PLAYLIST_SUCCESS,
  payload: playlist,
});

export function createPlaylist({ name, thumbnail, publicAccessible }) {
  return async function createPlaylistThunk(dispatch) {
    dispatch(playlistCreateRequest());

    const requestBody = {
      name: name,
      thumbnail: thumbnail,
      publicAccessible: publicAccessible,
    };

    const res = await api.createPlaylist(requestBody);

    if (res.isSuccessful) {
      dispatch(playlistCreateSuccess(res.data));
    } else {
      dispatch(playlistCreateError(res.errorMessage));
    }
  };
}

export function updatePlaylist(playlist) {
  return async function updatePlaylistThunk(dispatch) {
    dispatch(playlistUpdateRequest());

    const res = await api.updatePlaylist(playlist);

    if (res.isSuccessful) {
      dispatch(playlistUpdateSuccess(res.data));
    } else {
      dispatch(playlistUpdateError(res.errorMessage));
    }
  };
}

export function fetchPlaylists({
  fetchType = playlistTypes.ALL,
  filters = {},
}) {
  switch (fetchType) {
    case playlistTypes.ALL:
      return fetchAllPlaylists(filters);
    case playlistTypes.OWN:
      return fetchOwnPlaylists();
    case playlistTypes.FOLLOWING:
      return fetchFollowingPlaylists();
    case playlistTypes.POPULAR:
      return fetchPopularPlaylists();
    default:
      break;
  }
  return fetchAllPlaylists(filters);
}

export function fetchOwnPlaylists() {
  return async function fetchPlaylistsThunk(dispatch) {
    dispatch(fetchPlaylistRequest());

    const res = await api.getOwnPlaylists();

    if (res.isSuccessful) {
      const normalizedPlaylists = normalizePlaylists(res.data);
      dispatch(
        fetchPlaylistSuccess({
          type: playlistTypes.OWN,
          byID: normalizedPlaylists.entities.playlists,
          ids: {
            OWN: normalizedPlaylists.result,
          },
        }),
      );
    } else {
      dispatch(fetchPlaylistError(res.errorMessage));
    }
  };
}

export function fetchAllPlaylists() {
  return async function fetchPlaylistsThunk(dispatch) {
    dispatch(fetchPlaylistsRequest());

    try {
      const userToken = await getCurrentUserToken();

      // eslint-disable-next-line spaced-comment
      /*if (!userToken) {
        return dispatch(fetchPlaylistsError("User token null!"));
      }*/

      const res = await api.getPlaylists({
        Authorization: `Bearer ${userToken}`,
      });

      if (res.errorMessage) {
        return dispatch(fetchPlaylistsError(res.errorMessage));
      }

      console.log("BEFORE NORMALIZATION");
      console.log(res.data.data);
      // eslint-disable-next-line spaced-comment
      //const normalizedPlaylists = normalizePlaylists(res.data.data);
      const normalizedPlaylists = normalizeFullPlaylists(res.data.data);
      console.log("NORMALIZED DATA!");
      console.log(normalizedPlaylists);

      return dispatch(
        fetchPlaylistsSuccess({
          byID: normalizedPlaylists.entities.playlists,
          ids: normalizedPlaylists.result,
        }),
      );
    } catch (err) {
      return dispatch(fetchPlaylistsError(err));
    }
  };
}

export function fetchFollowingPlaylists() {
  return async function fetchPlaylistsThunk(dispatch) {
    dispatch(fetchPlaylistsRequest());

    const res = await api.getFollowingPlaylists();

    if (res.isSuccessful) {
      const normalizedPlaylists = normalizePlaylists(res.data);
      dispatch(
        fetchPlaylistsSuccess({
          type: playlistTypes.FOLLOWING,
          byID: normalizedPlaylists.entities.playlists,
          ids: normalizedPlaylists.result,
        }),
      );
    } else {
      dispatch(fetchPlaylistsError(res.errorMessage));
    }
  };
}

export function fetchPopularPlaylists() {
  return async function fetchPlaylistsThunk(dispatch) {
    dispatch(fetchPlaylistsRequest());

    const res = await api.getPopularPlaylists();

    if (res.isSuccessful) {
      const normalizedPlaylists = normalizePlaylists(res.data);
      dispatch(
        fetchPlaylistsSuccess({
          type: playlistTypes.POPULAR,
          byID: normalizedPlaylists.entities.playlists,
          ids: normalizedPlaylists.result,
        }),
      );
    } else {
      dispatch(fetchPlaylistsError(res.errorMessage));
    }
  };
}

export function fetchPlaylistById(playlistID) {
  return async function fetchPlaylistThunk(dispatch) {
    dispatch(fetchPlaylistRequest());

    const res = await api.getPlaylistById(playlistID);

    if (res.isSuccessful) {
      dispatch(fetchPlaylistSuccess(res.data));
    } else {
      dispatch(fetchPlaylistError(res.errorMessage));
    }
  };
}
