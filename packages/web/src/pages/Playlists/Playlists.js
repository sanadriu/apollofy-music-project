import React from "react";

import styled from "styled-components";
import { useParams } from "react-router-dom";

import withLayout from "../../components/hoc/withLayout";
import TracksList from "../../components/organisms/information/PopularTracks";
import TrackDetail from "../../components/molecules/TrackDetail";
import ProfileUserDescription from "../../components/atoms/ProfileUserDescription";
import ProfileOneStadistics from "../../components/atoms/ProfileOneStadistics";
import ProfileUserTitle from "../../components/atoms/ProfileUserTitle";
import PlaylistImage from "../../components/atoms/PlaylistImage";
import SmallText from "../../components/atoms/SmallText";
import { useFetchPlaylist } from "../../hooks/usePlaylists";

export const PageLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 0.3rem;
  margin: 1rem auto 2rem;
  border-radius: 1.3rem;
  background: ${({ theme }) => theme.colors.background.secondary};
`;

export const PictureDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 215px;
  width: 100%;
`;

export const DescriptionDiv = styled.div`
  padding: 1rem;
`;

export const StadisticsDiv = styled.div`
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const MainText = styled(SmallText)`
  @media only screen and (max-width: ${({ theme }) => theme.media.mobile}) {
    margin: auto;
  }
`;

function PlaylistsPage() {
  const { playlistId } = useParams();

  const { data } = useFetchPlaylist(playlistId);

  const playlist = data?.data?.data;

  return (
    <>
      <PageLayout>
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
      </PageLayout>
      <MainText>Tracks</MainText>
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
