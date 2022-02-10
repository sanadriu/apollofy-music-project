import React from "react";
import Player from "react-material-music-player"; // default export

export const ExampleAudioPlayer = () => {
  return <Player sx={{ width: "100vw", position: "fixed", bottom: 0 }} disableDrawer />;
};
