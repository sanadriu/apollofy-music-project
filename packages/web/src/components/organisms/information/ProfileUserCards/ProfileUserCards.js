import styled from "styled-components";
import PropTypes from "prop-types";
import React from "react";
import Slider from "react-slick";

import ProfileCard from "../../../molecules/ProfileCard";

const Layout = styled.div`
  margin: auto;
`;

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  arrows: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: false,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    }
  ]
};

const ProfileUserCards = ({ data }) => {
  return (
    <Layout>
      <Slider {...settings}>
        {data?.map((item) => (
          <ProfileCard
            key={item?.id}
            title={item?.title}
            data={item?.created_at}
            thumbnails={item?.thumbnails.url_default}
          />
        ))}
      </Slider>
    </Layout>
  );
};

ProfileUserCards.propTypes = {
  data: PropTypes.array,
};

ProfileUserCards.defaultProps = {
  data: [],
};

export default ProfileUserCards;
