import * as UploaderTypes from "./uploader-types";
import { getFileUrl, fileTypes } from "../../services/cloudinary";
import api from "../../api";

export const uploadSongRequest = () => ({
  type: UploaderTypes.UPLOAD_SONG_REQUEST,
});

export const uploadSongError = (message) => ({
  type: UploaderTypes.UPLOAD_SONG_ERROR,
  payload: message,
});

export const uploadSongSuccess = (songUrl) => ({
  type: UploaderTypes.UPLOAD_SONG_SUCCESS,
  payload: songUrl,
});

export const uploadImageRequest = () => ({
  type: UploaderTypes.UPLOAD_IMAGE_REQUEST,
});

export const uploadImageError = (message) => ({
  type: UploaderTypes.UPLOAD_IMAGE_ERROR,
  payload: message,
});

export const uploadImageSuccess = (imageUrl) => ({
  type: UploaderTypes.UPLOAD_IMAGE_SUCCESS,
  payload: imageUrl,
});

export function uploadSong({
  file,
  name = "",
  genres = [],
  onUploadProgress = (_) => {},
}) {
  return async function uploadSongThunk(dispatch) {
    dispatch(uploadSongRequest());

    getFileUrl({
      file: file,
      fileType: fileTypes.AUDIO,
      title: name,
      onUploadProgress: onUploadProgress,
    })
      .then((res) => {
        // eslint-disable-next-line no-console
        console.log(res.data);
        const songUrl = res.data.url;

        const response = api.createTrack({
          title: name,
          url: songUrl,
        });

        if (response.errorMessage) {
          return dispatch(uploadSongError(response.errorMessage));
        }

        return dispatch(uploadSongSuccess(response));
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
        return dispatch(uploadSongError(err));
      });
  };
}

export function uploadImage({
  file,
  name = "",
  genres = [],
  onUploadProgress = (_) => {},
}) {
  return async function uploadImageThunk(dispatch) {
    dispatch(uploadImageRequest());

    getFileUrl({
      file: file,
      fileType: fileTypes.IMAGE,
      onUploadProgress: onUploadProgress,
    })
      .then((res) => {
        const imageUrl = res.data.url;

        const response = api.createTrack({
          title: name,
          url: imageUrl,
        });

        if (response.errorMessage) {
          return dispatch(uploadImageError(response.errorMessage));
        }

        return dispatch(uploadImageSuccess(response));
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
        return dispatch(uploadImageError(err));
      });
  };
}
