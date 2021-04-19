import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Dropzone from "../../components/Dropzone";

import "./UploadSong.scss";

import { uploadSong } from "../../redux/uploader/uploader-actions";
import { uploaderSelector } from "../../redux/uploader/uploader-selectors";
import { fileTypes } from "../../services/cloudinary";

function UploadSong() {
  const dispatch = useDispatch();
  const { isUploadingSong, uploadSongSuccess, uploadSongError } = useSelector(
    uploaderSelector,
  );

  const [title, setTitle] = useState("");
  const [file, setFile] = useState();

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(
      uploadSong({
        file: file,
        title: title,
        onUploadProgress: (progress) => {},
      }),
    );

    setTitle("");
    setFile();
  }

  function handleSetTitle(e) {
    setTitle(e.target.value);
  }

  function handleSetFile(uploadFile) {
    setFile(uploadFile);
  }

  return (
    <div className="h-full p-4">
      <div className="h-full w-full flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold mb-6">Upload Song</h1>
        <hr className="my-4" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="form-input"
            value={title}
            onChange={handleSetTitle}
          />
          <Dropzone
            fileType={fileTypes.AUDIO}
            onFileSelected={(files) => {
              // eslint-disable-next-line no-console
              handleSetFile(files[0]);
            }}
          />

          <button
            className="btn btn-primary w-full"
            type="submit"
            disabled={isUploadingSong}
          >
            Login
          </button>
        </form>

        {isUploadingSong && <p>Uploading song...</p>}
        {uploadSongSuccess && <p>Upload successful!</p>}
        {uploadSongError && <p>Upload error!</p>}
      </div>
    </div>
  );
}

export default UploadSong;
