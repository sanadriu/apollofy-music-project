import { TableFooter } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { HomeSmallText } from "../../atoms/HomeSmallText/HomeSmallText";
import { PurpleLink } from "../../atoms/PurpleLink/PurpleLink";

const FooterText = styled(HomeSmallText)`
  color: lightgray;
  margin-bottom: 0.5rem;
`;

export default function Footer() {
  //   const navigate = useNavigate();
  return (
    <div>
      <FooterText>
        For developers, try out our <PurpleLink>API</PurpleLink>
      </FooterText>
      <FooterText>
        <PurpleLink href="https://github.com/Interna1ta/apollofy-music-project">
          Who are we? - Github repositories
        </PurpleLink>
      </FooterText>
      <FooterText>&#174; The Stringifiers</FooterText>
    </div>
  );
}
