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
 overflow: hidden;
  &:hover {
    opacity: 0.8;
  }
`;

const StyledIcon = styled(PlayCircleIcon)`
  position: absolute;
  top:25%;
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
        minWidth:160,
        height:250,
        overflow: "hidden",
        margin: 1,
        padding: 1,
        display: "block",
        borderRadius: "1.3rem",
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="150"
          src={thumbnails}
          alt="album image"
          sx={{ borderRadius: "1.1rem" }}
        />
        <StyledIcon />
        <CardContent>
          <Typography variant="body4" component="div" sx={{maxHeight: 100,overflow: "hidden", textOverflow:"ellipsis",whiteSpace: "nowrap", fontWeight: "bold"}}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" >
            {date.getFullYear()}
          </Typography>
        </CardContent>
      </CardActionArea>
    </StyledCard>
  );
};

ProfileCard.propTypes = {
  title: PropTypes.string,
  date: PropTypes.object,
  thumbnails: PropTypes.string,
};

ProfileCard.defaultProps = {
  title: "",
  date: new Date(),
  thumbnails: "",
};

export default ProfileCard;
