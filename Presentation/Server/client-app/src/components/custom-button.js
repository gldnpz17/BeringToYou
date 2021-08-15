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

  color: ${props => {
    if (props.danger) {
      return props.theme.textOnDanger;
    } else if (props.secondary) {
      return 'black';
    } else {
      return props.theme.textOnPrimary;
    }
  }};

  box-shadow: ${props => props.theme.shadow} 0rem 0.05rem 0.1rem;
  
  transition-property: all;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;

  &[aria-disabled='true'] {
    filter: grayscale(70%);

    :hover,:active,:focus {
      box-shadow: ${props => props.theme.shadow} 0rem 0.05rem 0.1rem;

      color: ${props => {
        if (props.danger) {
          return props.theme.textOnDanger;
        } else if (props.secondary) {
          return 'black';
        } else {
          return props.theme.textOnPrimary;
        }
      }};
    }
  }

  :not([aria-disabled='true']) {
    :hover,:active,:focus {
      filter: brightness(90%);

      color: ${props => {
        if (props.danger) {
          return props.theme.textOnDanger;
        } else if (props.secondary) {
          return 'black';
        } else {
          return props.theme.textOnPrimary;
        }
      }};
    }

    :active {
      transform: translateY(0.1rem);
    }

    :focus {
      box-shadow: ${props => props.theme.shadow} 0rem 0.03rem 0.1rem;
    }
  }
`;

const CustomButton = ({onClick, ...props}) => {
  const handleOnClick = (event) => {
    if (props['aria-disabled'] !== 'true') {
      onClick(event);
    }
  }

  return (
    <StyledButton variant='none' onClick={handleOnClick} {...props} />
  );
};

export default CustomButton;