import { useState } from "react";
import { Navbar } from "react-bootstrap";
import styled from "styled-components";
import MenuIcon from "../svg/menu-icon";
import KUTE from 'kute.js';

const StyledNavbar = styled(Navbar)`
  background-color: ${props => props.theme.primary};
  box-shadow: ${props => props.theme.shadow} 0rem 0.1rem 0.3rem;
  color: ${props => props.theme.secondary};
`;

const NavigationBar = () => {
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
    <StyledNavbar expand='md' className='fixed-top w-100'>
      <a onClick={() => toggleNavigation()}>
        <MenuIcon id='menu-icon' className='ms-3' style={{width: '2.2rem', height: '2.2rem'}} />
      </a>
    </StyledNavbar>
  );
};

export default NavigationBar;