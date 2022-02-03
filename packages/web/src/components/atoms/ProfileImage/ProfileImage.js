import React from "react";
import styled from "styled-components";
import { Avatar } from "@mui/material";

const MainDiv = styled.div`
  margin-left: 1rem;
`;


const ProfileImage = () => {
  return (
    <MainDiv>
      <Avatar alt="profile image" src="https://i.picsum.photos/id/1011/5472/3648.jpg?hmac=Koo9845x2akkVzVFX3xxAc9BCkeGYA9VRVfLE4f0Zzk" sx={{ width: 200, height: 200 }} />
    </MainDiv>
  );
};
export default ProfileImage;
