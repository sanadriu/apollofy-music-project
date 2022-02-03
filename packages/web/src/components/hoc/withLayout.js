import React from "react";
import styled from "styled-components";

import { FlexColumn } from "../atoms/FlexColumn/FlexColumn";
import ControlBar from "../molecules/ControlBar/ControlBar";
import { ExampleAudioPlayer } from "../organisms/AudioPlayer/AudioPlayer";
import Footer from "../organisms/Footer/Footer";
import FriendsColumn from "../organisms/FriendsColumn/FriendsColumn";
import MenuBar from "../organisms/MenuBar/MenuBar";

const MainLayout = styled.main`
  display: flex;
  gap: 1.5rem;
  padding: 2rem 2rem 0 2rem;
  justify-content: space-between;
`;

const PageContent = styled.div`
  flex-basis: 60%;
`;

function withLayout(WrappedComponent) {
  function WrapperComponent({ ...props }) {
    return (
      <>
        <MainLayout>
          <ControlBar />
          <PageContent>
            <WrappedComponent {...props} />
          </PageContent>
          <FlexColumn>
            <MenuBar />
            <FriendsColumn />
            <Footer />
          </FlexColumn>
        </MainLayout>
        <ExampleAudioPlayer />
      </>
    );
  }
  return WrapperComponent;
}

export default withLayout;
