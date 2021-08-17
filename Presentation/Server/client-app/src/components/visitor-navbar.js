import KUTE from 'kute.js';
import { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import SearchMenu from "../pages/visitor-page-components/search-menu";
import VisitorMenu from "../pages/visitor-page-components/visitor-menu";
import BackIcon from '../svg/back-icon';
import BeringharjoLogo from "../svg/beringharjo-logo";
import MenuIcon from "../svg/menu-icon";
import SearchIcon from "../svg/search-icon";

const Navbar = styled.div`
  background-color: ${props => props.theme.whitespace};
  box-shadow: ${props => props.theme.shadow} 0rem 0.1rem 0.3rem;

  z-index: 200;

  transition-duration: 0.5s;

  height: 3rem;

  & svg {
    width: 2rem;
    height: 2rem;
  }

  &.expanded {
    height: 100vh;
  }

  h1 {
    display: inline-block;

    font-size: 1.6rem;
    font-family: 'Open Sans';

    padding-right: 0.25rem;
    margin-bottom: 0;
  }
`;

const ExpandableContainer = styled.div`
  transition-duration: 0.5s;
  transition-delay: 0s;
  flex-grow: 0.0001;
  overflow: hidden;

  &.expanded {
    flex-grow: 1;
  }

  &.collapsed {
    flex-grow: 0.0001;
    transition-duration: 0.5s;
    * {
      width: 0;
    }
  }
`;

const NavigationContainer = styled.div`
  height: 3rem;
`;

const BrandContainer = styled(ExpandableContainer)`
  position: relative;
  height: 2rem;

  #brand-contents {
    transition-duration: 0.5s;
    height: 2rem;

    white-space: nowrap;

    position: absolute;
    left: 50%;
    transform: translateX(-50%);

    svg {
      transition-duration: 1s;

      width: 2rem;
      height: 2rem;
      vertical-align: baseline;
    }

    h1 {
      transition: max-width 0.5s 0.2s, opacity 1s 0.2s;

      overflow: hidden;

      vertical-align: baseline;

      max-width: 15rem;
      opacity: 100%;
    }
  }

  &.menu-open {
    #brand-contents {
      left: 100%;
      transform: translateX(-100%);

      svg {
        color: ${props => props.theme.primary};
      }
    }
  }

  &:not(.menu-open) {
    #brand-contents h1 {
      transition: max-width 0.5s, opacity 0.5s;

      opacity: 0%;
      max-width: 0;
    }
  }
`;

const SearchContainer = styled(ExpandableContainer)`
  display: flex;
  flex-direction: row;
  align-items: center;

  #title, #back-icon {
    transition-duration: 0.6s;
  }

  #back-icon {
    margin-right: 0.3rem;
    color: ${props => props.theme.primary};
  }

  &.expanded {
    #search-icon {
      color: black;
    }
  }

  &:not(.expanded) {
    #title, #back-icon {
      opacity: 0%;
      width: 0;
      margin: 0;
    }
  }
`;

const ExpandContent = styled.div`
  transition: opacity 0.5s;
  overflow: hidden;

  height: 0;
  opacity: 0%;

  &.expanded {
    height: 100%;
    opacity: 100%;
  }
`;

const Logo = styled(BeringharjoLogo)`
  color: ${props => props.theme.primaryLight};
`;

const Menu = styled(MenuIcon)`
  color: ${props => props.theme.primary};
`;

const Search = styled(SearchIcon)`
  color: ${props => props.theme.primary};

  transition-duration: 0.5s;
`;

const VisitorNavbar = ({ history, ...props }) => {
  const [menuExpanded, setMenuExpanded] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const checkLocation = () => {
    if (window.location.pathname === '/search') {
      setSearchOpen(true);
      setSearchExpanded(true);
    } else {
      setSearchOpen(false);
      setSearchExpanded(false);
    }
  };

  useEffect(() => {
    history.listen(() => {
      checkLocation();
    });

    checkLocation();
  }, []);

  const toggleMenu = () => {
    if (menuOpen) {
      setMenuOpen(false);
      setMenuExpanded(false);

      KUTE.fromTo('#current-nav-menu', { path: '#close-path' }, { path: '#menu-path' }, {
        duration: 250,
        morphPrecision: 1
      }).start();

      KUTE.fromTo('#menu-icon', { rotate: 180 }, { rotate: 360 }, {
        duration: 250
      }).start();
    } else {
      setMenuOpen(true);
      setMenuExpanded(true);

      KUTE.fromTo('#current-nav-menu', { path: '#menu-path' }, { path: '#close-path' }, {
        duration: 250,
        morphPrecision: 1
      }).start();

      KUTE.fromTo('#menu-icon', { rotate: 0 }, { rotate: 180 }, {
        duration: 250
      }).start();
    }
  };

  const openSearch = () => {
    history.push('/search');
  };

  const closeSearch = () => {
    history.push('/');
  };

  return (
    <>
      <Navbar {...props} className={`fixed-top d-flex flex-column ${menuExpanded || searchExpanded ? 'expanded' : ''}`}>
        <NavigationContainer className='d-flex flex-row align-items-center px-2 py-2'>
          <ExpandableContainer className={`${searchOpen ? 'collapsed' : ''}`}>
            <Menu id='menu-icon'
              onClick={() => toggleMenu()}
            />
          </ExpandableContainer>
          <BrandContainer
            className={`${searchOpen ? 'collapsed' : 'expanded'} ${menuOpen ? 'menu-open' : ''}`}
          >
            <div id='brand-contents'>
              <h1>beringtoyou.com</h1>
              <Logo />
            </div>
          </BrandContainer>
          <SearchContainer className={`${searchOpen ? 'expanded' : ''} ${menuOpen ? 'collapsed' : ''}`}>
            <BackIcon id='back-icon'
              onClick={() => {
                if (searchOpen) {
                  closeSearch();
                }
              }}
            />
            <Search id='search-icon'
              onClick={() => {
                if (!searchOpen) {
                  openSearch();
                }
              }}
            />
            <h1 id='title' className='text-nowrap'>Pencarian Toko</h1>
          </SearchContainer>
        </NavigationContainer>
        <ExpandContent className={`${menuExpanded || searchExpanded ? 'expanded' : ''}`}>
          {(() => {
            if (menuExpanded) {
              return (<VisitorMenu />);
            } else if (searchExpanded) {
              return (<SearchMenu />);
            }
          })()}
        </ExpandContent>
      </Navbar>
    </>
  );
};

export default withRouter(VisitorNavbar);