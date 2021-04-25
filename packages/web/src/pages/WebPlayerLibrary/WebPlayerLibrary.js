import React from "react";

import "./WebPlayerLibrary.scss";

import {
  WebPlayerFooter,
  WebPlayerLayout,
  WebPlayerMainContainer,
} from "../../components/WebPlayerLayout";

import WebPlayerSidebar from "../../components/WebPlayerSidebar/WebPlayerSidebar";
import WebPlayerMainView from "../../components/WebPlayerMainView/WebPlayerMainView";

function WebPlayerLibrary() {
  return (
    <WebPlayerLayout>
      <WebPlayerMainContainer>
        <WebPlayerSidebar />
        <WebPlayerMainView>
          <h1>Library</h1>
        </WebPlayerMainView>
      </WebPlayerMainContainer>
      <WebPlayerFooter />
    </WebPlayerLayout>
  );
}

export default WebPlayerLibrary;
