import React, { useState } from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledButton = styled.button`
  position: relative;
  font-weight: 400;
  font-size: 1rem;
  line-height: 2;
  height: 50px;
  transition: all 200ms linear;
  border-radius: 4px;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  align-self: center;
  border: none;
  cursor: pointer;
  outline: 0;
`;

const Button = ({ children, onClick, btnColor = 'black', labelColor, disabled, type, style, ...props }) => {
  const [hover, setHover] = useState(false);
  const toggleHover = () => { setHover(!hover); };

  const commonStyles = {
    backgroundColor: btnColor,
    color: labelColor || 'white'
  };

  const outlineStyles = {
    border: `1px solid ${btnColor}`,
    color: btnColor,
    backgroundColor: 'white'
  };

  const outlineHoverStyle = {
    color: labelColor || 'white',
    backgroundColor: btnColor
  };

  const roundedStyle = {
    backgroundColor: btnColor,
    color: labelColor || 'white',
    borderRadius: '25px'
  };

  const disabledStyle = {
    cursor: 'default',
    backgroundColor: btnColor,
    color: labelColor || 'white',
    opacity: 0.4
  };

  const blockStyles = {
    width: '95%',
    margin: '0 auto'
  };

  let btnStyle;

  switch (type) {
    case 'rounded':
      btnStyle = roundedStyle;
      break;
    case 'submit':
    case 'block':
      btnStyle = blockStyles;
      break;
    case 'outline':
      if (hover) {
        btnStyle = outlineHoverStyle;
      }
      else {
        btnStyle = outlineStyles;
      }
      break;
    default:
      btnStyle = {
        backgroundColor: btnColor,
        color: labelColor || 'white'
      };
      break;
  }

  return (
    <StyledButton
      style={
        disabled
          ? { ...commonStyles, ...btnStyle, ...disabledStyle, ...style }
          : { ...commonStyles, ...btnStyle, ...style }
      }
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
      {...props}
      type="button"
      onClick={!disabled ? onClick : () => { }}
    >
      {children || 'button'}
    </StyledButton>
  );
};

Button.propTypes = {
  btnColor: PropTypes.string,
  children: PropTypes.string,
  disabled: PropTypes.bool,
  labelColor: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
  type: PropTypes.string,
};

Button.defaultProps = {
  btnColor: null,
  children: null,
  disabled: false,
  labelColor: null,
  onClick: null,
  style: {},
  type: null,
};



export default Button;
