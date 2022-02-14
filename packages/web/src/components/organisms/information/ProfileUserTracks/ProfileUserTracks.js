import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import ProfileUserTrack from "../../../molecules/ProfileUserTrack";

const StyledUserTracks = styled.div`
  font-family: ${({ theme }) => theme.fonts.primary};
  margin: 1rem 0;
  background: #eeeee49c;
  border-radius: 1rem;
  padding: 0.5rem 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const ProfileUserTracks = ({ tracks }) => {
  return (
    <StyledUserTracks>
      {tracks.map((track, index) => (
        <ProfileUserTrack key={track.id} data={track} index={index} />
      ))}
    </StyledUserTracks>
  );
};

ProfileUserTracks.propTypes = {
  tracks: PropTypes.array,
};

ProfileUserTracks.defaultProps = {
  tracks: [],
};

export default ProfileUserTracks;
