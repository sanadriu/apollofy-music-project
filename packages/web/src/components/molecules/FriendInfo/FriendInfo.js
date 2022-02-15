import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import FlexColumn from "../../atoms/layout/FlexColumn";
import HomeSmallText from "../../atoms/body/HomeSmallText";
import DetailText from "../../atoms/body/DetailText";
import { UserLink } from "../UserDetail/UserDetail";

const Layout = styled.div`
  padding-left: 0.3rem;
  display: flex;
  justify-content: flex-start;
  gap: 0.5rem;
  border-radius: 1.3rem;
  width: 100%;

  gap: 0.5rem;
  &:hover {
    background-color: ${({ theme }) => theme.colors.background.secondary};
  }
`;

const SmallGap = styled(FlexColumn)`
  gap: 0;
  align-items: start;
`;

export const ProfilePicture = styled.img`
  margin-top: 1rem;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
`;

export default function FriendInfo(props) {
  const { id, profilePicture, username, lastTrack, firstName, lastName } = props;

  return (
    <Layout>
      <ProfilePicture alt="Friend's Picture" src={profilePicture} />
      <SmallGap>
        <UserLink to={`/users/${id}`}>
          <HomeSmallText>{`${firstName} ${lastName}`}</HomeSmallText>
        </UserLink>
        <DetailText>{username}</DetailText>
        {/* <DetailText>{lastTrack}</DetailText> */}
      </SmallGap>
    </Layout>
  );
}

FriendInfo.propTypes = {
  profilePicture: PropTypes.string,
  username: PropTypes.string,
  lastTrack: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  id: PropTypes.string,
};

FriendInfo.defaultProps = {
  profilePicture: "",
  username: "",
  lastTrack: "",
  firstName: "",
  lastName: "",
  id: "",
};
