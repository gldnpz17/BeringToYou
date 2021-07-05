import { Modal } from "react-bootstrap";
import styled from "styled-components";

const StyledModal = styled(Modal)`
  font-family: 'Open Sans';

  [type="password"] {
   font-family: var(--bs-font-sans-serif)
  }
`;

const AdminModal = (props) => {
  const handleOnHide = () => props.setShow(false);

  return (
    <StyledModal centered onHide={() => handleOnHide()} {...props}/>
  );
}

export default AdminModal;