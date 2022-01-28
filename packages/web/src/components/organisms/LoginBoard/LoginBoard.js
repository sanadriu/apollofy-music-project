import React from "react";
import styled from "styled-components";

const Board = styled.div`
  width: 100%;
  background-image: url("assets/img/music-pattern.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  flex-basis: 40%;
  transition: all 10s linear;
  transform-origin: center center;
  transform: rotate(360deg);
`;

const Logo = styled.img`
  display: block;
  margin: auto;
  width: 60%;
  height: 95%;
`;

export function LoginBoard() {
  return (
    <Board>
      <Logo src="assets/svg/big-logo.svg" alt="Strings Logo" />
    </Board>
  );
}
