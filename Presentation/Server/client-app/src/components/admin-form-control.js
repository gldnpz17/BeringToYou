import { Form } from "react-bootstrap"
import styled from "styled-components"

const FormControl = styled(Form.Control)`
  
`;

const AdminFormControl = (props) => {
  return (
    <FormControl {...props} />
  );
};

export default AdminFormControl;