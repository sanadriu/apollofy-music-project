import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StadisticsDiv = styled.div`
  width: 33%;
  display: inline-block;
`;

const SpanText = styled.div`
  margin-left: 0.5em;
  display: inline;
`;

const ProfileOneStadistics = ({ count, text}) => {
  return (
    <StadisticsDiv>
      <b>{count}</b>
      <SpanText>{text}</SpanText>
    </StadisticsDiv>
  );
};


ProfileOneStadistics.propTypes = {
  count: PropTypes.number,
  text: PropTypes.string,
};

ProfileOneStadistics.defaultProps = {
  count: 0,
  text: 'Property',
};


export default ProfileOneStadistics;
