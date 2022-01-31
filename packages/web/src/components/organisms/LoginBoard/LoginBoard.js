import React from "react";
import styled from "styled-components";

const Board = styled.div`
  width: 100%;
  background-image: url("assets/svg/music-pattern.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  flex-basis: 40%;

  &#rotating-bg {
    animation: rotation 10s linear infinite;
  }

  &@keyframes #rotating-bg {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
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
