/* eslint-disable react/self-closing-comp */
/* eslint-disable spaced-comment */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import "./WebPlayerPlaylist.scss";

import * as ROUTES from "../../routes";

import {
  WebPlayerFooter,
  WebPlayerLayout,
  WebPlayerMainContainer,
} from "../../components/WebPlayerLayout";

import { playlistItemSelector } from "../../redux/playlist/playlist-selector";
import { authSelector } from "../../redux/auth/auth-selectors";

import { fetchAllPlaylists } from "../../redux/playlist/playlist-actions";

import WebPlayerSidebar from "../../components/WebPlayerSidebar/WebPlayerSidebar";
import WebPlayerMainView from "../../components/WebPlayerMainView/WebPlayerMainView";

import HomeLayout from "../../components/HomeLayout";
import Table from "../../components/CardPanel";
import TableRow from "../../components/TableRow";

function WebPlayerPlaylist() {
  const dispatch = useDispatch();
  const { id: playlistId } = useParams();
  const playlist = playlistItemSelector({ id: playlistId });

  const { isAuthenticated } = useSelector(authSelector);

  useEffect(() => {
    //if (isAuthenticated)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  /*if (!isAuthenticated) {
    // eslint-disable-next-line no-console
    console.log("Not authenticated");
    return <Redirect to={ROUTES.LOGIN} />;
  }*/

  // eslint-disable-next-line no-console
  console.log(playlist);

  const handleTrackClick = (id) => {
    // eslint-disable-next-line no-console
    console.log(`Track id: ${id}`);
  };

  return (
    <WebPlayerLayout>
      <WebPlayerMainContainer>
        <WebPlayerSidebar />
        <WebPlayerMainView>
          <HomeLayout>
            <Table title={playlist.name}></Table>
          </HomeLayout>
        </WebPlayerMainView>
      </WebPlayerMainContainer>
      <WebPlayerFooter />
    </WebPlayerLayout>
  );
}

export default WebPlayerPlaylist;
