import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import PersonIcon from "@mui/icons-material/Person";
import AlbumIcon from "@mui/icons-material/Album";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

const StadisticsDiv = styled.div`
  display: flex;
  justify-content: center;
  align-item: center;
  min-width: 50px;
`;

const SpanText = styled.div`
  margin-left: 0.5em;
  margin-right: 0.5rem;
  display: inline;
  color: ${({ theme }) => theme.colors.text};
  @media only screen and (max-width: 1000px) {
    display: none;
  }
`;

const StyledTracks = styled(MusicNoteIcon)`
  margin-left: 5px;
  display: none;
  color: ${({ theme }) => theme.colors.text};
  @media only screen and (max-width: 1000px) {
    display: block;
  }
`;

const StyledFollowers = styled(PersonIcon)`
  margin-left: 5px;
  color: ${({ theme }) => theme.colors.text};
  display: none;
  @media only screen and (max-width: 1000px) {
    display: block;
  }
`;

const StyledAlbums = styled(AlbumIcon)`
  margin-left: 5px;
  display: none;
  @media only screen and (max-width: 1000px) {
    display: block;
  }
`;

const StyledCount = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: bold;
  text-align: center;
  @media only screen and (max-width: 1000px) {
    display: block;
  }
`;

const ProfileOneStadistics = ({ count, text }) => {
  switch (text) {
    case "Songs":
      return (
        <StadisticsDiv>
          <StyledCount>{count}</StyledCount>
          <StyledTracks />
          <SpanText>{text}</SpanText>
        </StadisticsDiv>
      );

    case "Followers":
      return (
        <StadisticsDiv>
          <StyledCount>{count}</StyledCount>
          <StyledFollowers />
          <SpanText>{text}</SpanText>
        </StadisticsDiv>
      );

    case "Albums":
      return (
        <StadisticsDiv>
          <StyledCount>{count}</StyledCount>
          <StyledAlbums />
          <SpanText>{text}</SpanText>
        </StadisticsDiv>
      );

    default:
      return "";
  }
};

ProfileOneStadistics.propTypes = {
  count: PropTypes.number,
  text: PropTypes.string,
};

ProfileOneStadistics.defaultProps = {
  count: 0,
  text: "Property",
};

export default ProfileOneStadistics;
