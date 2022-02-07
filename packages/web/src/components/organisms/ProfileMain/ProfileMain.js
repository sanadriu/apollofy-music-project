import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ProfileImage from "../../atoms/ProfileImage/ProfileImage";
import ProfileUserDescription from "../../atoms/ProfileUserDescription/ProfileUserDescription";
import ProfileUserTitle from "../../atoms/ProfileUserTitle/ProfileUserTitle";
import ProfileStadistics from "../../molecules/ProfileStadistics/ProfileStadistics";

const ProfileContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin: auto;
  border-radius: 1.3rem;
  background: #eeeee4;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const AvatarDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 215px;
  width: 100%;
`;

const DescriptionDiv = styled.div`
  padding: 1rem;
`;

const ProfileMain = ({ user, albums, tracks }) => {
  return (
    <ProfileContent>
      <AvatarDiv>
        <ProfileImage image={user?.thumbnails?.url_default} />
      </AvatarDiv>
      <DescriptionDiv>
        <ProfileUserTitle title={user?.firstname} id={user?.id}/>
        <ProfileStadistics tracks={tracks} followers={user?.num_followers} albums={albums} />
        <ProfileUserDescription description={user?.description} />
      </DescriptionDiv>
    </ProfileContent>
  );
};

ProfileMain.propTypes = {
  user: PropTypes.object,
  albums: PropTypes.number,
  tracks: PropTypes.number,
};

ProfileMain.defaultProps = {
  user: {},
  albums: 0,
  tracks: 0,
};

export default ProfileMain;
