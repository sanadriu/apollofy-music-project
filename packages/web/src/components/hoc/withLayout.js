import React from "react";
import { isBrowser, isMobile } from "react-device-detect";
import styled from "styled-components";

import { FlexColumn } from "../atoms/FlexColumn/FlexColumn";
import ControlBar from "../molecules/ControlBar/ControlBar";
import { ExampleAudioPlayer } from "../organisms/AudioPlayer/AudioPlayer";
import Footer from "../organisms/Footer/Footer";
import FriendsColumn from "../organisms/FriendsColumn/FriendsColumn";
import MenuBar from "../organisms/MenuBar/MenuBar";

const MainLayout = styled.main`
  display: flex;
  gap: 2rem;
  padding: 1rem 1rem 0 1rem;
  justify-content: space-between;
  margin-bottom: 6rem;

  @media only screen and (max-width: 992px) {
    padding: 1rem 0;
    gap: 0.5rem;
    flex-direction: column;
    justify-content: center;
  }

  @media only screen and (max-width: 600px) {
    padding: 1rem;
  }
`;

const PageContent = styled.div`
  width: 60%;
  @media only screen and (max-width: 1000px) {
    width:95%
  }
`;

const RightFlex = styled(FlexColumn)`
  display: flex;
  justify-content: flex-start;
`;

function withLayout(WrappedComponent) {
  function WrapperComponent({ ...props }) {
    return (
      <>
        {isBrowser && (
          <>
            <MainLayout>
              <ControlBar />
              <PageContent>
                <WrappedComponent {...props} />
              </PageContent>
              <RightFlex>
                <MenuBar />
                <FriendsColumn />
                <Footer />
              </RightFlex>
            </MainLayout>
            <ExampleAudioPlayer />
          </>
        )}
        {isMobile && (
          <>
            <MainLayout>
              <PageContent>
                <WrappedComponent {...props} />
              </PageContent>
            </MainLayout>
            <ExampleAudioPlayer />
            <ControlBar />
          </>
        )}
      </>
    );
  }
  return WrapperComponent;
}

export default withLayout;
