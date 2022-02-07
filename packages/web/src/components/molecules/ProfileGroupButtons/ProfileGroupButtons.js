import React from "react";
import styled from "styled-components";
import CategoryButton from "../../atoms/ProfileButtonCategory/ProfileButtonCategory";

const GroupButtons = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 0rem 0rem 1rem 0rem;
`;

const ProfileGroupButtons = () => {
  return (
    <GroupButtons>
      <CategoryButton text="Tracks" />
      <CategoryButton text="Playlists" />
      <CategoryButton text="Albums" />
    </GroupButtons>
  );
};
export default ProfileGroupButtons;
