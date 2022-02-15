import styled from "styled-components";

const RightSideBar = styled.aside`
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  width: 16rem;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 1.3rem;
`;

export default RightSideBar;