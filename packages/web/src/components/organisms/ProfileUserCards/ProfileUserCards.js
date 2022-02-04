import { Box } from "@mui/system";
import PropTypes from "prop-types";
import React from "react";
import Slider from "react-slick";
import ProfileCard from "../../molecules/ProfileCard/ProfileCard";

const ProfileUserCards = ({ data }) => {
  // return (
  //   <Box
  //     sx={{
  //       display: "flex",
  //       flexWrap: "wrap",
  //       justifyContent: "flex-start",
  //       maxHeight: "210px",
  //       overflow: "hidden",
  //     }}
  //   >
  //     <ProfileCard title="" date="" thumbnails="" />
  //     <ProfileCard />
  //     <ProfileCard />
  //     <ProfileCard />
  //     <ProfileCard />
  //     <ProfileCard />
  //   </Box>
  // );

  return (
    <Layout>
      <Slider {...settings}>
        <ProfileCard title="" date="" thumbnails="" />
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
