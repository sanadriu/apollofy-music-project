import React from "react";
import PropTypes from "prop-types";

const PlaylistDetail = ({ playlist }) => {
  // console.log(playlist);

  return (
    <>
      <div>{playlist.title}</div>
    </>
  );
}

export default PlaylistDetail;

PlaylistDetail.propTypes = {
  playlist: PropTypes.object,
};

PlaylistDetail.defaultProps = {
  playlist: {},
};