import { Navbar } from "react-bootstrap";
import styled from "styled-components";

const StyledNavbar = styled(Navbar)`
  background-color: ${props => props.theme.primaryDark};
  box-shadow: ${props => props.theme.shadow} 0rem 0.1rem 0.3rem;
`;

const AdminNavigationBar = (props) => {
  return (
    <StyledNavbar {...props} className='fixed-top w-100'>
      <p className='m-0'>Lorem Ipsum</p>
    </StyledNavbar>
  );
};

export default AdminNavigationBar;