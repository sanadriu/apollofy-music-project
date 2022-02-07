import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const MainDiv = styled.div`
  margin-left: 1rem;
  width: 100%;
  padding-right: 1rem;
  padding-top: 1rem;
  position: relative;
`;

const ImageProfile = styled.img`
  height: 200px;
  border-radius: 30px 30px 30px 30px;
  width: 100%;
  object-fit: cover;
  &:hover {
    opacity: 0.7;
  }
`;

const StyledTypography = styled(Typography)`
  position: absolute;
  top: 10%;
  left: 35%;
  font-weight: bold;
  visibility: hidden;
  opacity: 1;
  /* ${MainDiv}:hover & {
    top: 40%;
    letter-spacing: 5px;
    transition: all 600ms ease-in-out;
    visibility: visible;
  } */
`;


const ProfileImage = ({image}) => {
  return (
    <MainDiv md={{ borderRadius: 0, width: "10px" }}>
      <ImageProfile
        alt="profile image"
        src={image}
      />
      <StyledTypography variant="h3">Chanel</StyledTypography>
    </MainDiv>
  );
};

ProfileImage.propTypes = {
  image: PropTypes.string,
};

ProfileImage.defaultProps = {
  image: "",
};
export default ProfileImage;
