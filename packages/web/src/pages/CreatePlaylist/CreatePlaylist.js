import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import * as ROUTES from "../../routes";

import Checkbox from "../../components/Checkbox";

import "./CreatePlaylist.scss";

import { createPlaylist } from "../../redux/playlist/playlist-actions";
import { selectPlaylistState } from "../../redux/playlist/playlist-selector";

function CreatePlaylist() {
  const dispatch = useDispatch();
  const {
    playlistCreateError,
    playlistCreateSuccess,
    playlistCreateRequest,
  } = useSelector(selectPlaylistState);

  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [isPublic, setPublic] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(
      createPlaylist({
        title: title,
        type: type,
        publicAccessible: isPublic,
      }),
    );

    // eslint-disable-next-line spaced-comment
    /*setTitle("");
    setFile();*/
  }

  function handleSetTitle(e) {
    setTitle(e.target.value);
  }

  function handleSetType(e) {
    setType(e.target.value);
  }

  function handleSetPublic(e) {
    // eslint-disable-next-line no-console
    setPublic(e.target.checked);
  }

  if (playlistCreateSuccess) {
    return <Redirect to={ROUTES.WEB_PLAYER_HOME} />;
  }

  return (
    <div className="h-full p-4">
      <div className="h-full w-full flex flex-col justify-center items-center">
        <div className="p-4 bg-light rounded-md flex flex-col justify-center items-center">
          <h1 className="text-2xl text-dark font-bold mb-4">Create Playlist</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="title" className="form-label text-dark">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="form-input"
              value={title}
              onChange={handleSetTitle}
            />
            <label htmlFor="type" className="form-label text-dark">
              Type
            </label>
            <input
              type="text"
              id="type"
              className="form-input"
              value={type}
              onChange={handleSetType}
            />
            <label htmlFor="public" className="form-label text-dark">
              Public Accessible
            </label>
            <Checkbox
              id="public"
              key="public"
              checked={isPublic}
              onChange={handleSetPublic}
              value="false"
            />

            <button
              className="btn btn-primary w-full"
              type="submit"
              disabled={playlistCreateRequest}
            >
              Create
            </button>
          </form>

          {playlistCreateRequest && (
            <p className="text-dark">Creating playlist...</p>
          )}
          {playlistCreateSuccess && (
            <p className="text-dark">Create successful!</p>
          )}
          {playlistCreateError && <p className="text-dark">Create error!</p>}
        </div>
      </div>
    </div>
  );
}

export default CreatePlaylist;
