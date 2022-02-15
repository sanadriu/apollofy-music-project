import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import FlexColumn from "../../atoms/layout/FlexColumn";
import HomeSmallText from "../../atoms/body/HomeSmallText";
import { UserLink } from "../UserDetail/UserDetail";
import defaultAvatar from "../../../images/defaultAvatar.png";
import DetailText from "../../atoms/body/DetailText";

const Layout = styled.div`
  padding-left: 0.3rem;
  display: flex;
  justify-content: flex-start;
  gap: 0.5rem;
  border-radius: 1.25rem;
  width: 100%;
  margin-bottom: 1rem;
  &:hover {
    background-color: ${({ theme }) => theme.colors.background.secondary};
  }
`;

const SmallGap = styled(FlexColumn)`
  gap: 0;
  align-items: start;
  justify-content: center;
  padding-top: 1.6rem;
`;

export const Image = styled.img`
  margin-top: 1rem;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
`;

export default function FriendInfo(props) {
  const { id, profilePicture, username, firstName, lastName } = props;

  return (
    <Layout>
      <Image alt="Friend's Picture" src={profilePicture || defaultAvatar} />
      <SmallGap>
        <UserLink to={`/users/${id}`}>
          <HomeSmallText>{username}</HomeSmallText>
        </UserLink>
        <DetailText>{username}</DetailText>
      </SmallGap>
    </Layout>
  );
}

FriendInfo.propTypes = {
  profilePicture: PropTypes.string,
  username: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  id: PropTypes.string,
};

FriendInfo.defaultProps = {
  profilePicture: "",
  username: "",
  firstName: "",
  lastName: "",
  id: "",
};
