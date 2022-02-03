import React from "react";
import styled from "styled-components";
import ProfileImage from "../../atoms/ProfileImage/ProfileImage";
import ProfileUserDescription from "../../atoms/ProfileUserDescription/ProfileUserDescription";
import ProfileUserTitle from "../../atoms/ProfileUserTitle/ProfileUserTitle";
import ProfileStadistics from "../../molecules/ProfileStadistics/ProfileStadistics";

const ProfileContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin: auto;
  border-radius: 1.3rem;
  background: #eeeee4;
`;

const AvatarDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 215px;
  width: 30%;
`;

const DescriptionDiv = styled.div`
  padding: 1rem;
  width: 70%;
`;

const ProfileMain = () => {
  return (
    <ProfileContent>
      <AvatarDiv>
        <ProfileImage />
      </AvatarDiv>
      <DescriptionDiv>
        <ProfileUserTitle title='Chanel' />
        <ProfileStadistics />
        <ProfileUserDescription
          description="Consequat in ipsum Lorem ea est exercitation. Aute Lorem velit amet culpa laborum laborum
      incididunt cupidatat. Ullamco sunt aliqua excepteur Lorem adipisicing veniam ad mollit
      voluptate."
        />
      </DescriptionDiv>
    </ProfileContent>
  );
};

export default ProfileMain;
