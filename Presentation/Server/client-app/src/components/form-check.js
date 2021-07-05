import { Form } from "react-bootstrap";
import styled from "styled-components";

const StyledFormCheck = styled(Form.Check)`
  .form-check-input:focus {
    border-color: ${props => props.theme.secondaryTransparent};
    box-shadow: 0 0 0 0.25rem ${props => props.theme.secondaryTransparent};
  }

  .form-check-input:checked {
    background-color: ${props => props.theme.secondary};
    border-color: ${props => props.theme.secondary};
  }
`;

const FormCheck = (props) => {
  return (
    <StyledFormCheck type='checkbox' {...props} />
  );
};

export default FormCheck;