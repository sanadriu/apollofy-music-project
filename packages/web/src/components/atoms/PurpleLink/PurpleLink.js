import styled from "styled-components";

const PurpleLink = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.label};
`;

export default PurpleLink;
