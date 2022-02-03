import React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { purple, lime } from "@mui/material/colors";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const ColorButton = styled(Button)({
  color: lime,
  backgroundColor: purple[500],
  "&:hover": {
    backgroundColor: purple[700],
  },
});

const ButtonPlaySuffle = () => {
  return (
    <Stack spacing={2} direction="row">
      <ColorButton variant="contained" sx={{ borderRadius: "100px" }} startIcon={<PlayArrowIcon />}>
        Play shuffle
      </ColorButton>
    </Stack>
  );
};

export default ButtonPlaySuffle;
