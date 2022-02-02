import React from "react";
import styled from "styled-components";

const StyledNumber = styled.div`
  font-family: ${({ theme }) => theme.fonts.primary};
  color: grey;
  font-weight: 400;
  font-size: 2rem;
  display: flex;
  justify-content:center;
  align-items:center;
  width:10%;
`;

const ProfileNumTrack = () => {
  return (
    <StyledNumber><div>1</div></StyledNumber>
  );
};



export default ProfileNumTrack;
