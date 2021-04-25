import React from "react";

import "./WebPlayerSearch.scss";

import {
  WebPlayerFooter,
  WebPlayerLayout,
  WebPlayerMainContainer,
} from "../../components/WebPlayerLayout";

import WebPlayerSidebar from "../../components/WebPlayerSidebar/WebPlayerSidebar";
import WebPlayerMainView from "../../components/WebPlayerMainView/WebPlayerMainView";

function WebPlayerSearch() {
  return (
    <WebPlayerLayout>
      <WebPlayerMainContainer>
        <WebPlayerSidebar />
        <WebPlayerMainView>
          <h1>Search</h1>
        </WebPlayerMainView>
      </WebPlayerMainContainer>
      <WebPlayerFooter />
    </WebPlayerLayout>
  );
}

export default WebPlayerSearch;
