import React from "react";
import styled from "styled-components";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import PropTypes from "prop-types";
import { formatNumReprod } from "../../../utils/utils";

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

function addFavoriteTrack(id){
  try {
    console.log('trackID:'.id)
  } catch (error) {
    console.log(error);
  }
}

const ProfileNumReprod = ({data}) => {
  let reprods = "";
  if(data?.num_plays != null){
    reprods = formatNumReprod(data.num_plays);
  }

  return (
    <StyledNumTrack>
      <HeadphonesIcon sx={{ color: "purple" }} onClick={() => addFavoriteTrack(data.id)}/>
      <StyledNumber>{reprods}</StyledNumber>
    </StyledNumTrack>
  );
};

ProfileNumReprod.propTypes = {
  data: PropTypes.object
};

ProfileNumReprod.defaultProps = {
  data: {}
};

export default ProfileNumReprod;
