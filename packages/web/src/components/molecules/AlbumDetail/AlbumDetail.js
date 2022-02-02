import React from "react";
import PropTypes from "prop-types";

const AlbumDetail = ({ album }) => {
  return (
    <>
      <div>{album.title}</div>
    </>
  );
}

export default AlbumDetail;

AlbumDetail.propTypes = {
  album: PropTypes.exact({
    id: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    released_date: PropTypes.string.isRequired,
    tracks: PropTypes.arrayOf(PropTypes.object),
    num_tracks: PropTypes.number.isRequired,
    num_likes: PropTypes.number.isRequired,
    liked_by: PropTypes.arrayOf(PropTypes.object),
    thumbnails: PropTypes.exact({
      url_default: PropTypes.string,
      url_medium: PropTypes.string,
      url_large: PropTypes.string,
    }),
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
  }),
};

AlbumDetail.defaultProps = {
  album: {
    id: null,
    user: {},
    title: null,
    released_date: null,
    tracks: [],
    num_tracks: null,
    num_likes: null,
    liked_by: [],
    thumbnails: {
      url_default: null,
      url_medium: null,
      url_large: null,
    },
    created_at: null,
    updated_at: null,
  },
};