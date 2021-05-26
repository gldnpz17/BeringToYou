import { Button } from "react-bootstrap";
import styled from "styled-components";

const StyledButton = styled(Button)`
  background-color: ${props => props.theme.secondary};
  border-color: ${props => props.theme.secondary};
  color: black;
  box-shadow: ${props => props.theme.shadow} 0rem 0.15rem 0.3rem;
  
  transition-property: all;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;

  :hover {
    background-color: ${props => props.theme.secondaryDark};
    border-color: ${props => props.theme.secondaryDark};
  }

  :active {
    background-color: ${props => props.theme.secondaryDark};
    border-color: ${props => props.theme.secondaryDark};

    transform: translateY(0.2rem);
  }

  :focus {
    border-color: ${props => props.theme.secondaryDark};
    box-shadow: ${props => props.theme.shadow} 0rem 0.15rem 0.3rem;
    color: black;
  }
`;

const CustomButton = (props) => {
  return (
    <StyledButton variant='none' {...props} />
  );
}

export default CustomButton;