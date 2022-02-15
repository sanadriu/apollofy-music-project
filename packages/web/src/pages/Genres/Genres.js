import React from "react";
import { useParams } from "react-router-dom";

import withLayout from "../../components/hoc/withLayout";
import Tracks from "../../components/organisms/information/Tracks";
import PlaylistImage from "../../components/atoms/images/PlaylistImage/PlaylistImage";

import { useFetchGenre } from "../../hooks/useGenres";
import {
  DescriptionDiv,
  MainText,
  PageLayout,
  PictureDiv,
} from "../Playlists/Playlists";
import ProfileUserTitle from "../../components/atoms/body/ProfileUserTitle";

function GenresPage() {
  const { genreId } = useParams();
  const { data: genre } = useFetchGenre(genreId);
  return (
    <>
      <PageLayout>
        <PictureDiv>
          <PlaylistImage src={genre?.thumbnails?.url_default} />
        </PictureDiv>
        <DescriptionDiv>
          <ProfileUserTitle title={genre?.name} id={genre?.id} />
        </DescriptionDiv>
      </PageLayout>
      <MainText>Tracks</MainText>
      {/* <Tracks /> */}
    </>
  );
}

export default withLayout(GenresPage);
