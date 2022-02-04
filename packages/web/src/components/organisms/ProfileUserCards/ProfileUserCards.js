import styled from "styled-components";
import PropTypes from "prop-types";
import React from "react";
import Slider from "react-slick";
import ProfileCard from "../../molecules/ProfileCard/ProfileCard";

const Layout = styled.div`
  //max-width: 80rem;
  margin: auto;
  width: 90%;
`;

const ProfileUserCards = ({ data }) => {

  const settings = {
    dots: true,
    infinite: true,
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
          infinite: true,
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

  return (
    <Layout>
      <Slider {...settings}>
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
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
