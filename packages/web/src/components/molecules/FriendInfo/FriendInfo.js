import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import FlexColumn from "../../atoms/FlexColumn";
import HomeSmallText from "../../atoms/HomeSmallText";
import DetailText from "../../atoms/DetailText";

const Layout = styled.div`
  padding: 0.3rem;
  margin: 0.5rem;
  display: flex;
  justify-content: flex-start;
  gap: 0.5rem;

  &:hover {
    background-color: darkgray;
  }
`;

export const ProfilePicture = styled.img`
  width: 3rem;
  border-radius: 50%;
`;

export default function FriendInfo(props) {
  const { profilePicture, name, lastTrack } = props;
  
  return (
    <Layout>
      <ProfilePicture alt="Friend's Picture" src={profilePicture} />
      <FlexColumn>
        <HomeSmallText>{name}</HomeSmallText>
        {/* <DetailText>{lastTrack}</DetailText> */}
      </FlexColumn>
    </Layout>
  );
}

FriendInfo.propTypes = {
  profilePicture: PropTypes.string,
  name: PropTypes.string,
  lastTrack: PropTypes.string,
};

FriendInfo.defaultProps = {
  profilePicture: "",
  name: "",
  lastTrack: "",
};
