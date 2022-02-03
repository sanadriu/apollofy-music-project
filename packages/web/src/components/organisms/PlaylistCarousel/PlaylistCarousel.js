import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "./PlaylistCarousel.css";

import PlaylistHomeCard from "../../molecules/PlaylistHomeCard/PlaylistHomeCard";
import { usePlaylists } from "../../../hooks/usePlaylists";

const Layout = styled.div`
  max-width: 45rem;
  margin: auto;
`;

export default function PlaylistCarousel() {
  const { data: playlists } = usePlaylists();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: true,
  };
  return (
    <Layout>
      <Slider {...settings}>
        {playlists?.data?.data?.map((playlist) => (
          <PlaylistHomeCard key={playlist.id} playlist={playlist} />
        ))}
      </Slider>
    </Layout>
  );
}
