import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import GroupIcon from "@mui/icons-material/Group";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useDispatch } from "react-redux";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

import DetailText from "../../atoms/DetailText";
import HomeSmallText from "../../atoms/HomeSmallText";
import { useFollowUser } from "../../../hooks/useUsers";

const UserLayout = styled.div`
  display: flex;
  gap: 1rem;
  padding: 0.3rem;
  border-radius: 1.3rem;
  width: 100%;

  &:hover {
    background-color: ${({ theme }) => theme?.colors?.background?.secondary_hover};
  }
`;

const UserPicture = styled.img`
  max-width: 3rem;
  max-height: 3rem;
  margin: 0;
  border-radius: 0.3rem;
`;

const UserFlex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding-left: 0.5rem;
  flex-grow: 1;
`;

const UserLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    color: white;
  }
`;

const StyledNumUser = styled.div`
  font-family: ${({ theme }) => theme?.fonts?.primary};
  margin-left: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  width: 20%;
`;

const StyledNumber = styled.div`
  padding-left: 0.5rem;
  font-weight: 500;
`;

const FollowButton = styled.button`
  border-radius: 1.3rem;
  background-color: ${({ theme }) => theme?.colors?.label};
  border: none;
  color: white;
  cursor: pointer;
  align-items: center;
  height: 2.1rem;
  width: 2.1rem;
  padding: 0.3rem;

  svg {
    width: 1.2rem;
  }

  &:hover {
    background-color: purple;
  }
`;

const UserDetail = ({ user }) => {
  const [isFollowed, setIsFollowed] = useState(false);
  const { mutate } = useFollowUser();

  const handleFollow = (userId) => {
    mutate(userId);
    setIsFollowed(!isFollowed);
  };

  return (
    <UserLayout>
      <UserPicture alt={`${user?.username}`} src={user?.thumbnails?.url_default} />
      <UserFlex>
        <UserLink to={`/users/${user.id}`}>
          <HomeSmallText>{`${user.firstname} ${user.lastname}`}</HomeSmallText>
          <DetailText>{user.username}</DetailText>
        </UserLink>
      </UserFlex>
      <StyledNumUser>
        <GroupIcon />
        <StyledNumber>{user?.followed_by?.length}</StyledNumber>
      </StyledNumUser>
      {isFollowed ? (
        <FollowButton onClick={() => handleFollow(user?.id)}>
          <StarOutlineIcon />
        </FollowButton>
      ) : (
        <FollowButton onClick={() => handleFollow(user?.id)}>
          <PersonAddIcon />
        </FollowButton>
      )}
    </UserLayout>
  );
};

export default UserDetail;

UserDetail.propTypes = {
  user: PropTypes.exact({
    id: PropTypes.string.isRequired,
    email: PropTypes.string,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    birth_date: PropTypes.string.isRequired,
    liked_albums: PropTypes.arrayOf(PropTypes.object),
    liked_tracks: PropTypes.arrayOf(PropTypes.object),
    followed_by: PropTypes.arrayOf(PropTypes.object),
    num_liked_albums: PropTypes.number,
    num_liked_tracks: PropTypes.number,
    followed_playlists: PropTypes.arrayOf(PropTypes.object),
    followed_users: PropTypes.arrayOf(PropTypes.object),
    followed_by: PropTypes.arrayOf(PropTypes.object),
    num_followed_playlists: PropTypes.number,
    num_followed_users: PropTypes.number,
    num_followers: PropTypes.number,
    thumbnails: PropTypes.exact({
      url_default: PropTypes.string,
      url_medium: PropTypes.string,
      url_large: PropTypes.string,
    }),
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
  }),
};

UserDetail.defaultProps = {
  user: {
    id: null,
    email: null,
    firstname: null,
    lastname: null,
    username: null,
    description: null,
    birth_date: null,
    liked_albums: {},
    liked_tracks: {},
    num_liked_albums: null,
    num_liked_tracks: null,
    followed_playlists: {},
    followed_users: {},
    followed_by: {},
    num_followed_playlists: null,
    num_followed_users: null,
    num_followers: null,
    thumbnails: {
      url_default: null,
      url_medium: null,
      url_large: null,
    },
    created_at: null,
    updated_at: null,
  },
};
