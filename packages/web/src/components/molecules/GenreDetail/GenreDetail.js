import React from "react";
import PropTypes from "prop-types";

const GenreDetail = ({ genre }) => {
  return (
    <>
      <div>{genre.name}</div>
    </>
  );
}

export default GenreDetail;

GenreDetail.propTypes = {
  genre: PropTypes.exact({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    thumbnails: PropTypes.exact({
      url_default: PropTypes.string,
      url_medium: PropTypes.string,
      url_large: PropTypes.string,
    }),
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
  }),
};

GenreDetail.defaultProps = {
  genre: {
    id: null,
    name: null,
    thumbnails: {
      url_default: null,
      url_medium: null,
      url_large: null,
    },
    created_at: null,
    updated_at: null,
  },
};