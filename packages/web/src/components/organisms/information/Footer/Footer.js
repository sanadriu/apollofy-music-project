import React from "react";
import styled from "styled-components";

import HomeSmallText from "../../../atoms/HomeSmallText";
import PurpleLink from "../../../atoms/PurpleLink";

const FooterText = styled(HomeSmallText)`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.5rem;
  font-weight: 300;
`;

const FooterLayout = styled.footer`
  line-height: initial;
  @media only screen and (max-width: 992px) {
    display: none;
  }
`;

export default function Footer() {
  //   const navigate = useNavigate();
  return (
    <FooterLayout>
      <FooterText>
        For developers, try out our <PurpleLink>API</PurpleLink>
      </FooterText>
      <FooterText>
        <PurpleLink href="https://github.com/Interna1ta/apollofy-music-project">
          Who are we? - Github repositories
        </PurpleLink>
      </FooterText>
      <FooterText>&#174; The Stringifiers</FooterText>
    </FooterLayout>
  );
}
