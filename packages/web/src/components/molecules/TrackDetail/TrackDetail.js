import React from "react";
import PropTypes from "prop-types";

const TrackDetail = ({ track }) => {
  console.log(track);

  return (
    <>
      <div>{track.title}</div>
      <div>{track.user}</div>
    </>
  );
}

export default TrackDetail;

TrackDetail.propTypes = {
  track: PropTypes.object,
};

TrackDetail.defaultProps = {
  track: {},
};