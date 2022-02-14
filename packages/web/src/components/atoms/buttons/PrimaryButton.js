import styled from "styled-components";

const PrimaryButton = styled.button`
  border-radius: 0.3rem;
  color: white;
  border: 1px solid black;
  padding: 0.5rem;
  background-color: #b04aff;
  cursor: pointer;

  &:hover {
    background-color: white;
    border: 1px solid #b04aff;
    color: #b04aff;
  }
`;

export default PrimaryButton;
