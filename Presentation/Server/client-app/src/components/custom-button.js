import { Button } from "react-bootstrap";
import styled from "styled-components";

const StyledButton = styled(Button)`
  background-color: ${props => {
    if (props.secondary === true) {
      return props.theme.whitespace;
    } else if (props.danger === true) {
      return props.theme.danger;
    } else {
      return props.theme.secondary;
    }
  }};

  border-color: ${props => {
    if (props.secondary === true) {
      return props.theme.secondary;
    } else if (props.danger === true) {
      return props.theme.danger;
    } else {
      return 'none';
    }
  }};

  color: ${props => props.danger ? props.theme.textOnDanger : 'black'};

  box-shadow: ${props => props.theme.shadow} 0rem 0.05rem 0.1rem;
  
  transition-property: all;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;

  &[aria-disabled='true'] {
    filter: grayscale(70%);

    :hover,:active,:focus {
      box-shadow: ${props => props.theme.shadow} 0rem 0.05rem 0.1rem;
    }
  }

  :not([aria-disabled='true']) {
    :hover,:active,:focus {
      filter: brightness(90%);

      color: ${props => props.danger ? props.theme.textOnDanger : 'black'};
    }

    :active {
      transform: translateY(0.1rem);
    }

    :focus {
      box-shadow: ${props => props.theme.shadow} 0rem 0.03rem 0.1rem;
    }
  }
`;

const CustomButton = (props) => {
  return (
    <StyledButton variant='none' {...props} />
  );
};

export default CustomButton;