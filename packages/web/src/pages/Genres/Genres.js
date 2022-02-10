import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import withLayout from "../../components/hoc/withLayout";
import Tracks from "../../components/organisms/information/Tracks";
import Genres from "../../components/organisms/information/Genres";
import PlaylistImage from "../../components/atoms/PlaylistImage/PlaylistImage";
import ProfileOneStadistics from "../../components/atoms/ProfileOneStadistics/ProfileOneStadistics";
import ProfileUserDescription from "../../components/atoms/ProfileUserDescription/ProfileUserDescription";
import ProfileUserTitle from "../../components/atoms/ProfileUserTitle/ProfileUserTitle";

import { useSingleGenre } from "../../hooks/useGenres";
import {
  DescriptionDiv,
  MainText,
  PageLayout,
  PictureDiv,
  StadisticsDiv,
} from "../Playlists/Playlists";

function GenresPage() {
  const { genreId } = useParams();
  const { data } = useSingleGenre(genreId);
  return (
    <>
      <PageLayout>
        <PictureDiv>
          <PlaylistImage src={data?.data?.data?.thumbnails?.url_default} />
        </PictureDiv>
        <DescriptionDiv>
          <ProfileUserTitle title={data?.data?.data?.name} id={data?.data?.data?.id} />
        </DescriptionDiv>
      </PageLayout>
      <MainText>Tracks</MainText>
      <Tracks />
    </>
  );
}

export default withLayout(GenresPage);
