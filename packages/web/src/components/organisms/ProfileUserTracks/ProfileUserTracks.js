import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { useUserTracks } from "../../../hooks/useTracks";
import ProfileUserTrack from "../../molecules/ProfileUserTrack/ProfileUserTrack";

const StyledUserTracks = styled.div`
  font-family: ${({ theme }) => theme.fonts.primary};
  margin: 1rem 0;
  background: #eeeee49c;
  border-radius: 1rem;
  padding: 0.5rem 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const ProfileUserTracks = () => {
  const { profileId } = useParams();
  const { data: tracks } = useUserTracks(1, undefined, 5, "num_plays", "desc", profileId);

  return (
    <StyledUserTracks>
      {tracks?.data?.data?.map((track, index) => (
        <ProfileUserTrack key={track.id} data={track} index={index} />
      ))}
    </StyledUserTracks>
  );
};

export default ProfileUserTracks;
