import React from "react";
import PropTypes from "prop-types";

const UserDetail = ({ user }) => {

  return (
    <>
      <div>{user.username}</div>
    </>
  );
}

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
    num_liked_albums: PropTypes.number,
    num_liked_tracks: PropTypes.number,
    followed_playlists: PropTypes.arrayOf(PropTypes.object),
    followed_users: PropTypes.arrayOf(PropTypes.object),
    followers: PropTypes.arrayOf(PropTypes.object),
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
    followers: {},
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