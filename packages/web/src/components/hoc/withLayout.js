import React from "react";
import styled from "styled-components";

import { FlexColumn } from "../atoms/FlexColumn/FlexColumn";
import ControlBar from "../molecules/ControlBar/ControlBar";
import Footer from "../organisms/Footer/Footer";
import FriendsColumn from "../organisms/FriendsColumn/FriendsColumn";
import MenuBar from "../organisms/MenuBar/MenuBar";

const MainLayout = styled.main`
  display: flex;
  gap: 1rem;
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
      </>
    );
  }
  return WrapperComponent;
}

export default withLayout;
