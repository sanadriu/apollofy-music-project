/* eslint-disable spaced-comment */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory, withRouter } from "react-router-dom";

import "./WebPlayerHome.scss";

import * as ROUTES from "../../routes";

import {
  WebPlayerFooter,
  WebPlayerLayout,
  WebPlayerMainContainer,
} from "../../components/WebPlayerLayout";

import { selectPlaylistState } from "../../redux/playlist/playlist-selector";
import { selectUserState } from "../../redux/user/user-selectors";
import { authSelector } from "../../redux/auth/auth-selectors";

import { fetchAllPlaylists } from "../../redux/playlist/playlist-actions";
import { fetchAllUsers } from "../../redux/user/user-actions";

import WebPlayerSidebar from "../../components/WebPlayerSidebar/WebPlayerSidebar";
import WebPlayerMainView from "../../components/WebPlayerMainView/WebPlayerMainView";

import HomeLayout from "../../components/HomeLayout";
import CardPanel from "../../components/CardPanel";
import Card from "../../components/Card";

function WebPlayerHome(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    byID: usersByID,
    ids: usersIds,
    usersLoading,
    usersLoadingError,
    usersFetched,
  } = useSelector(selectUserState);

  const {
    byID: playlistsByID,
    ids: playlistsIds,
    playlistsLoading,
    playlistsLoadingError,
    playlistsFetched,
  } = useSelector(selectPlaylistState);

  const { isAuthenticated } = useSelector(authSelector);

  useEffect(() => {
    //if (isAuthenticated)
    if (!playlistsIds.ALL.length) {
      dispatch(fetchAllPlaylists());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  /*if (!isAuthenticated) {
    // eslint-disable-next-line no-console
    console.log("Not authenticated");
    return <Redirect to={ROUTES.LOGIN} />;
  }*/

  const handleCardClick = (id) => {
    // eslint-disable-next-line no-console
    console.log(`Card id: ${id}`);

    // eslint-disable-next-line react/prop-types
    // `/web-player/playlists/${id}`
    history.push(`/web-player/playlists/${id}`);
  };

  // eslint-disable-next-line no-console
  console.log(playlistsIds);

  let playlists = [];
  if (playlistsFetched) {
    playlists = playlistsIds.ALL.map((id, index) => {
      return (
        <Card
          key={id}
          id={id}
          title={playlistsByID[id].name}
          thumbnail={playlistsByID[id].thumbnail}
          subtitle={playlistsByID[id].description}
          handleClick={handleCardClick}
        />
      );
    });
  }

  return (
    <WebPlayerLayout>
      <WebPlayerMainContainer>
        <WebPlayerSidebar />
        <WebPlayerMainView>
          <HomeLayout>
            <h1>Homes</h1>
            <br />
            {playlistsLoading && <h4>Playlist Loading</h4>}
            {playlistsLoadingError && <h4>Playlist Loading Error</h4>}
            {playlistsFetched && (
              <CardPanel
                endpoint=""
                subtitle="All playlists created"
                title="All Playlists"
              >
                {playlists}
              </CardPanel>
            )}
          </HomeLayout>
        </WebPlayerMainView>
      </WebPlayerMainContainer>
      <WebPlayerFooter />
    </WebPlayerLayout>
  );
}

export default withRouter(WebPlayerHome);
