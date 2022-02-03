import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const ButtonCategory = styled.button`
  display: inline-block;
  padding: 1rem 1.5rem;
  margin: 0 1rem;
  border-radius: 2rem 2rem 2rem 2rem;
  background: white;
  border: 1px #eeeee4 solid;
  cursor: pointer;
  &:hover {
    background-color: purple;
    border: 1px solid #b04aff;
    color: white;
  }
`;

const CategoryButton = ({text}) => {
  return <ButtonCategory>{text}</ButtonCategory>;
};

CategoryButton.propTypes = {
  text: PropTypes.string,
};

CategoryButton.defaultProps = {
  text: "",
};

export default CategoryButton;
