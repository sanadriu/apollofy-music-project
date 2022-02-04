import React from "react";
import styled from "styled-components";
import ProfileOneStadistics from "../../atoms/ProfileOneStadistics/ProfileOneStadistics";

const StadisticsDiv = styled.div`
  margin-bottom: 1rem;
  display:flex;
  flex-wrap: wrap;
`;

const ProfileStadistics = () => {
  return (
    <StadisticsDiv>
      <ProfileOneStadistics count={10} text='Songs'/>
      <ProfileOneStadistics count={50} text='Followers'/>
      <ProfileOneStadistics  count={3} text='Albums'/>
    </StadisticsDiv>
  );
};
export default ProfileStadistics;
