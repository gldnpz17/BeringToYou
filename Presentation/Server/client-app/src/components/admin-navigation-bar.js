import { Navbar } from "react-bootstrap";
import styled from "styled-components";
import BeringharjoLogo from '../svg/beringharjo-logo';

const StyledNavbar = styled(Navbar)`
  background-color: ${props => props.theme.primaryDark};
  box-shadow: ${props => props.theme.shadow} 0rem 0.1rem 0.3rem;

  h1 {
    font-size: 1.3rem;
    font-family: 'Open Sans';
    font-weight: lighter;
    margin-left: 0.25rem;
    margin-bottom: 0;

    b {
      color: ${props => props.theme.secondary};
    }

    color: ${props => props.theme.secondaryDark};
  }
`;

const Logo = styled(BeringharjoLogo)`
  width: 1.6rem;
  height: 1.6rem;
  margin-left: 0.5rem;

  color: ${props => props.theme.secondary};
`;

const AdminNavigationBar = (props) => {
  return (
    <StyledNavbar {...props} className='fixed-top w-100'>
      <Logo />
      <h1><b>Beringharjo</b>Admin</h1>
    </StyledNavbar>
  );
};

export default AdminNavigationBar;