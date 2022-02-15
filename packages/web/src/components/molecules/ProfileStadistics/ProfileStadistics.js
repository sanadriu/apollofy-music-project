import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import ProfileOneStadistics from "../../atoms/body/ProfileOneStadistics";

const StadisticsDiv = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ProfileStadistics = ({ tracks, followers, albums }) => {
  return (
    <StadisticsDiv>
      <ProfileOneStadistics count={tracks} text="Songs" />
      <ProfileOneStadistics count={followers} text="Followers" />
      <ProfileOneStadistics count={albums} text="Albums" />
    </StadisticsDiv>
  );
};

ProfileStadistics.propTypes = {
  tracks: PropTypes.number,
  followers: PropTypes.number,
  albums: PropTypes.number,
};

ProfileStadistics.defaultProps = {
  tracks: 0,
  followers: 0,
  albums: 0,
};

export default ProfileStadistics;
