import styled from "styled-components";

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  align-items: center;
  flex-grow: 1;
  width: 25%;
  @media only screen and (max-width: 1000px) {
    display: none;
  }
`;
