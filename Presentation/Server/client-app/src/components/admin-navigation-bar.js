import { Navbar } from "react-bootstrap";
import styled from "styled-components";
import BeringharjoLogo from '../svg/beringharjo-logo';
import IconButton from "./icon-button";
import WebIcon from '../svg/web-icon';

const StyledNavbar = styled.div`
  background-color: ${props => props.theme.whitespace};
  box-shadow: ${props => props.theme.shadow} 0rem 0.1rem 0.3rem;
  padding: 0.75rem;

  h1 {
    font-size: 1.3rem;
    font-family: 'Open Sans';
    font-weight: lighter;

    b {
      color: ${props => props.theme.primary};
    }

    color: ${props => props.theme.primaryDark};
  }

  a {
    color: black !important;
    text-decoration: none;
    cursor: pointer;

    :hover {
      opacity: 75%;
    }
  }
`;

const Logo = styled(BeringharjoLogo)`
  width: 1.6rem;
  height: 1.6rem;

  color: ${props => props.theme.primary};
`;

const AdminNavigationBar = (props) => {
  return (
    <StyledNavbar {...props} className='fixed-top w-100 d-flex flex-row align-items-center'>
      <Logo />
      <h1 className='mb-0 ml-1'><b>Beringharjo</b>Admin</h1>
      <div className='flex-grow-1'></div>
      <a onClick={() => {}}>Log Out</a>
    </StyledNavbar>
  );
};

export default AdminNavigationBar;