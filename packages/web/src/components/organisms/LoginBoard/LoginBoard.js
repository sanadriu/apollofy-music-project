import React from "react";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const GradientBG = styled.div`
  width: 100%;
  background-image: url("assets/svg/music-pattern.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  flex-basis: 40%;
  z-index: -2;
`;

const RotatingSymbols = styled.div`
  width: auto;
  height: 100%;
  background-image: url("assets/svg/Symbols.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 110rem 110rem;
  margin: auto;
  z-index: -1;

  animation: ${rotate} 25s linear infinite;
`;

const Logo = styled.img`
  position: absolute;
  top: 10rem;
  left: 5rem;
  z-index: 999;
  margin: auto;
  width: 35%;
  height: 60%;
`;

export function LoginBoard() {
  return (
    <GradientBG>
      <RotatingSymbols />
      <Logo src="assets/svg/big-logo.svg" alt="Strings Logo" />
    </GradientBG>
  );
}
