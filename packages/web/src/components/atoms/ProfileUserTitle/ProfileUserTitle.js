import React from "react";
import PropTypes from "prop-types";

const ProfileUserTitle = ({title}) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};

ProfileUserTitle.propTypes = {
  title: PropTypes.string,
};

ProfileUserTitle.defaultProps = {
  title: "",
};
export default ProfileUserTitle;
