import React from "react";
import PropTypes from "prop-types";

const PlaylistDetail = ({ playlist }) => {
  return (
    <>
      <div>{playlist.title}</div>
    </>
  );
}

export default PlaylistDetail;

PlaylistDetail.propTypes = {
  playlist: PropTypes.exact({
    id: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    color: PropTypes.string,
    tracks: PropTypes.arrayOf(PropTypes.object),
    num_tracks: PropTypes.number.isRequired,
    num_followers: PropTypes.number.isRequired,
    followed_by: PropTypes.arrayOf(PropTypes.object),
    thumbnails: PropTypes.exact({
      url_default: PropTypes.string,
      url_medium: PropTypes.string,
      url_large: PropTypes.string,
    }),
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
  }),
};

PlaylistDetail.defaultProps = {
  playlist: {
    id: null,
    user: {},
    title: null,
    description: null,
    color: null,
    tracks: [],
    num_tracks: null,
    num_followers: null,
    followed_by: [],
    thumbnails: {
      url_default: null,
      url_medium: null,
      url_large: null,
    },
    created_at: null,
    updated_at: null,
  },
};