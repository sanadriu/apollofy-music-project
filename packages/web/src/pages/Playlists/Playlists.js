import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import ProfileUserDescription from "../../components/atoms/ProfileUserDescription/ProfileUserDescription";
import ProfileOneStadistics from "../../components/atoms/ProfileOneStadistics/ProfileOneStadistics";
import ProfileUserTitle from "../../components/atoms/ProfileUserTitle/ProfileUserTitle";
import PlaylistImage from "../../components/atoms/PlaylistImage/PlaylistImage";
import TrackDetail from "../../components/molecules/TrackDetail/TrackDetail";
import withLayout from "../../components/hoc/withLayout";
import { TracksList } from "../../components/organisms/PopularTracks/PopularTracks";
import { SmallText } from "../../components/atoms/SmallText/SmallText";

const PlaylistContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 0.3rem;
  margin: 1rem auto 2rem;
  border-radius: 1.3rem;
  background: ${({ theme }) => theme.colors.background.secondary};
`;

const PictureDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 215px;
  width: 100%;
`;

const DescriptionDiv = styled.div`
  padding: 1rem;
`;

const StadisticsDiv = styled.div`
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const TracksText = styled(SmallText)`
  @media only screen and (max-width: ${({ theme }) => theme.media.mobile}) {
    margin: auto;
  }
`;

function PlaylistsPage() {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    (async function fetchPlaylist() {
      const { data } = await axios(`http://localhost:4000/playlists/${playlistId}`);
      setPlaylist(data.data);
    })();
  }, []);

  return (
    <>
      <PlaylistContent>
        <PictureDiv>
          <PlaylistImage picture={playlist?.thumbnails?.url_default} title={playlist?.title} />
        </PictureDiv>
        <DescriptionDiv>
          <ProfileUserTitle title={playlist?.title} />
          <StadisticsDiv>
            <ProfileOneStadistics count={playlist?.num_tracks} text="Songs" />
            <ProfileOneStadistics count={playlist?.num_followers} text="Followers" />
          </StadisticsDiv>
          <ProfileUserDescription description={playlist?.description} />
        </DescriptionDiv>
      </PlaylistContent>
      <TracksText>Tracks</TracksText>
      <TracksList>
        {playlist?.tracks === [] ? (
          <SmallText>There are no songs in this playlist yet</SmallText>
        ) : (
          playlist?.tracks.map((track) => <TrackDetail key={track.id} track={track} />)
        )}
      </TracksList>
    </>
  );
}

export default withLayout(PlaylistsPage);
