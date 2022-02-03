import { Box } from "@mui/system";
import React from "react";
import ProfileCard from "../../molecules/ProfileCard/ProfileCard";

const ProfileUserCards = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: 'flex-start',
        maxHeight: "210px",
        overflow: 'hidden'
      }}
    >
      <ProfileCard />
      <ProfileCard />
      <ProfileCard />
      <ProfileCard />
      <ProfileCard />
      <ProfileCard />
    </Box>
  );
};

export default ProfileUserCards;
