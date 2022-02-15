import React from "react";
import Player from "react-material-music-player";

const AudioPlayer = () => {
  return (
    <Player
      sx={{
        "@media screen and (max-width: 992px)": { bottom: "4.2rem", boxShadow: "none" },
      }}
    />
  );
};

export default AudioPlayer;
