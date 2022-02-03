import React from "react";
import styled from "styled-components";
import HeadphonesIcon from "@mui/icons-material/Headphones";

const StyledNumTrack = styled.div`
  font-family: ${({ theme }) => theme.fonts.primary};
  margin-left: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  width: 20%;
`;

const StyledNumber = styled.div`
  padding-left: 0.5rem;
  font-weight: 500;
`;

const ProfileNumReprod = () => {
  return (
    <StyledNumTrack>
      <HeadphonesIcon sx={{ color: "purple" }} />
      <StyledNumber>350</StyledNumber>
    </StyledNumTrack>
  );
};

export default ProfileNumReprod;
