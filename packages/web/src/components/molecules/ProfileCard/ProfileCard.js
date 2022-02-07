import React from "react";
import PropTypes from "prop-types";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import styled from "styled-components";

const StyledCard = styled(Card)`
  position: relative;
  &:hover {
    opacity: 0.8;
  }
`;

const StyledIcon = styled(PlayCircleIcon)`
  position: absolute;
  top:20%;
  left:40%;
  color: white;
  visibility: hidden;
  transition: 1ms all;
  ${StyledCard}:hover & {
    transition: 1ms all;
    visibility: visible;
  }
`;
const ProfileCard = ({ title, date, thumbnails }) => {
  return (
    <StyledCard
      sx={{
        maxWidth: 150,
        minWidth: 130,
        margin: 1,
        padding: 1,
        width: "20%",
        display: "block",
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="100"
          src="https://images.pexels.com/photos/10931590/pexels-photo-10931590.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt="album image"
          sx={{ borderRadius: 1 }}
        />
        <StyledIcon />
        <CardContent>
          <Typography variant="body4" component="div">
            Titulo
          </Typography>
          <Typography variant="body2" color="text.secondary" >
            2022
          </Typography>
        </CardContent>
      </CardActionArea>
    </StyledCard>
  );
};

ProfileCard.propTypes = {
  title: PropTypes.string,
  date: PropTypes.object,
  thumbnails: PropTypes.object,
};

ProfileCard.defaultProps = {
  title: "",
  date: new Date(),
  thumbnails: {},
};

export default ProfileCard;
