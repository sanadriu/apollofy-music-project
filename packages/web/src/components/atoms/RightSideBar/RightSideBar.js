import styled from "styled-components";

export const RightSideBar = styled.div`
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  width: 18rem;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 1.3rem;
`;
