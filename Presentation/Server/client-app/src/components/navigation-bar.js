import { useState } from "react";
import { Navbar } from "react-bootstrap";
import styled from "styled-components";
import MenuIcon from "../svg/menu-icon";
import KUTE from 'kute.js';
import BeringharjoLogo from "../svg/beringharjo-logo";

const StyledNavbar = styled(Navbar)`
  background-color: ${props => props.theme.primary};
  box-shadow: ${props => props.theme.shadow} 0rem 0.1rem 0.3rem;
  color: ${props => props.theme.secondary};

  h1 {
    font-family: 'Open Sans';
    font-size: 1.6rem;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const NavigationBar = (props) => {
  const [navigationOpened, setNavigationOpened] = useState(false);

  const toggleNavigation = () => {
    if (navigationOpened) {
      setNavigationOpened(false);
      document.getElementById('navigation-overlay').style.height = '0%';
      
      KUTE.fromTo('#current-nav-menu', {path: '#close-path'}, {path: '#menu-path'}, {
        duration: 250,
        morphPrecision: 1
      }).start();

      KUTE.fromTo('#menu-icon', {rotate: 180}, {rotate: 360}, {
        duration: 250
      }).start();
    } else {
      setNavigationOpened(true);
      document.getElementById('navigation-overlay').style.height = '100%';
      
      KUTE.fromTo('#current-nav-menu', {path: '#menu-path'}, {path: '#close-path'}, {
        duration: 250,
        morphPrecision: 1
      }).start();

      KUTE.fromTo('#menu-icon', {rotate: 0}, {rotate: 180}, {
        duration: 250
      }).start();
    }
  };

  return (
    <StyledNavbar {...props} className='fixed-top w-100 d-flex'>
      <a className='d-flex flex-row align-items-center flex-grow-1'
        href='/'
      >
        <BeringharjoLogo style={{width: '1.6rem', height: '1.6rem'}} />
        <h1 className='m-0 ml-1'>BeRING TO YOU</h1>
      </a>
      <MenuIcon id='menu-icon' className='mr-2' 
        style={{width: '2.2rem', height: '2.2rem'}} 
        onClick={() => toggleNavigation()}
      />
    </StyledNavbar>
  );
};

export default NavigationBar;