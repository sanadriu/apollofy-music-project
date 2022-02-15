import React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { purple, lime } from "@mui/material/colors";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PropTypes from "prop-types";
import { PlayerInterface, Track } from "react-material-music-player";

const ColorButton = styled(Button)({
  color: lime,
  marginTop: "1rem",
  backgroundColor: purple[500],
  "&:hover": {
    backgroundColor: purple[700],
  },
});

const ButtonPlaySuffle = ({ tracks }) => {
  const playRandom = () => {
    const random = tracks[Math.floor(Math.random() * tracks.length)];

    PlayerInterface.play([
      new Track(
        random.id,
        random?.thumbnails?.url_default,
        random?.title,
        random?.user?.username,
        random.url,
      ),
    ]);
  };
  return (
    <Stack spacing={2} direction="row">
      <ColorButton
        onClick={playRandom}
        variant="contained"
        sx={{ borderRadius: "100px" }}
        startIcon={<PlayArrowIcon />}
      >
        Play shuffle
      </ColorButton>
    </Stack>
  );
};

ButtonPlaySuffle.propTypes = {
  tracks: PropTypes.object,
};

ButtonPlaySuffle.defaultProps = {
  tracks: {},
};
export default ButtonPlaySuffle;
