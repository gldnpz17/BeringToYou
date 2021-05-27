import { Form } from "react-bootstrap";
import styled from "styled-components";

const StyledRadio = styled(Form.Check)`
  input {
    position: relative;
    background-color: ${props => props.theme.whitespace};
    border-color: ${props => props.theme.secondary} !important;
  }

  input:checked {
    background-color: ${props => props.theme.whitespace};
  }

  input:checked::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 50%;
    background: ${props => props.theme.secondary};
  }
`;

const FormRadio = ({ label, name, id }) => {
  return (
    <StyledRadio
      type='radio'
      id={id}
      name={name}
      label={label}
    />
  );
};

export default FormRadio;