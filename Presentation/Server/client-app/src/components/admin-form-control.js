import { Form } from "react-bootstrap"
import styled from "styled-components"

const FormControl = styled(Form.Control)`
  :focus {
    border-color: ${props => props.theme.secondary};
    box-shadow: 0 0 0 0.25rem ${props => props.theme.secondaryTransparent};
  }
`;

const AdminFormControl = (props) => {
  return (
    <FormControl {...props} />
  );
};

export default AdminFormControl;