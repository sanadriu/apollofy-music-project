import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import ProfileUserTrack from "../../../molecules/ProfileUserTrack";

const StyledUserTracks = styled.div`
  font-family: ${({ theme }) => theme.fonts.primary};
  margin: 1rem 0;
  background: ${({ theme }) => theme.colors.background.secondary};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 1rem;
  padding: 0.5rem 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const StyledNotListenedTracks = styled.p`
  font-weight: 600;
  text-align: center;
  margin-bottom: 0;
`;

const ProfileUserTracks = ({ tracks }) => {
  return (
    <StyledUserTracks>
      {tracks?.data?.data?.length > 0 ? (
        tracks?.data?.data?.map((track, index) => (
          <ProfileUserTrack key={track.id} data={track} index={index} />
        ))
      ) : (
        <StyledNotListenedTracks>You havent heard any song yet :(</StyledNotListenedTracks>
      )}
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
