import styled from "styled-components";

const RegisterInput = styled.input`
  width: 90%;
  border-radius: 0.3rem;
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0.5rem;
  background-color: ${({ theme }) => theme.colors.background.primary};

  &:focus {
    background-color: ${({ theme }) => theme.colors.label};
  }
`;

export default RegisterInput;
