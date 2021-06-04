import styled from "styled-components";
import ArrowCollapseLeftIcon from '../svg/arrow-collapse-left-icon'; 
import AccountIcon from '../svg/account-icon';
import AdminIcon from '../svg/admin-icon';
import MapIcon from '../svg/map-icon';
import ShopIcon from '../svg/shop-icon';
import MiscIcon  from '../svg/misc-icon';
import ChevronDoubleLeftIcon from '../svg/chevron-double-left-icon';
import { useState } from "react";

const Container = styled.div`
  z-index: 10;

  background-color: ${props => props.theme.primary};

  &.minimized {
    #minimize-button .icon {
      left: 0;
      transform: translateX(0);
      transform: scaleX(-1);
    }

    .option-label {
      max-width: 0;
      height: 0;
      margin: 0;
    }

    #greeting-message {
      max-height: 0;

      p {
        max-width: 0;
        visibility: hidden;
      }
    }

    #profile-picture-container {
      height: 2.8rem;

      #profile-picture {
        left: 0.5rem;
        transform: translateX(0%);

        height: 2.8rem;
        width: 2.8rem;
      }
    }
  }

  #greeting-message {
    transition-property: max-height;
    transition-duration: 0.5s;

    max-height: 100vh;
    overflow: hidden;

    color: white;
    font-family: 'Open Sans';
  }

  #profile-picture-container {
    position: relative;

    height: 5rem;
  }

  #profile-picture {
    transition-duration: 0.5s;

    position: absolute;
    left: 50%;
    transform: translateX(-50%);

    width: 5rem;
    height: 5rem;

    border-radius: 2.5rem;

    object-fit: cover;
  }

  .icon {
    height: 1.6rem;
    width: 1.6rem;
  }
`;

const NavigationOption = styled.div`
  padding: 0.5rem;
  position: relative;

  display: flex;
  flex-direction: row;
  align-items: center;

  font-family: 'Roboto';

  .option-label {
    transition-duration: 0.5s;
    white-space: nowrap;

    max-width: 100vw;
    margin-right: 1rem;
    margin-left: 0.25rem;
    margin-bottom: 0;
    overflow: hidden;
    color: white;
  }

  .icon {
    color: ${props => props.theme.secondary};
  }

  &.selected {
    .option-label {
      color: black;
    }

    .icon {
      color: ${props => props.theme.secondaryDark};
    }

    ::after {
      content: '';

      position: absolute;
      left: 0;
      right: -0.25rem;
      top: 0;
      bottom: 0;
      z-index: -1;

      border-top-right-radius: 0.25rem;
      border-bottom-right-radius: 0.25rem;

      background-color: ${props => props.theme.secondary};
    }
  }
`;

const MinimizeSidebarButton = styled.div`
  position: relative;

  .icon {
    position: relative;

    transition: left 0.6s, transform 0.3s linear 0.15s, color 0.3s;

    color: ${props => props.theme.secondary};

    left: 100%;
    transform: translateX(-150%);

    margin: 0.5rem;

    &:hover {
      filter: brightness(90%);
    }
  }
`;

const AdminSidebar = (props) => {
  const [minimized, setMinimized] = useState(false);

  const toggleMinimized = () => {
    if (minimized) {
      setMinimized(false);

      document.getElementById('admin-sidebar').classList.remove('minimized');
    } else {
      setMinimized(true);

      document.getElementById('admin-sidebar').classList.add('minimized');
    }
  };

  return (
    <Container {...props} id='admin-sidebar'>
      <MinimizeSidebarButton id='minimize-button'
        onClick={() => toggleMinimized()}
      >
        <ChevronDoubleLeftIcon className='icon' />
      </MinimizeSidebarButton>
      <div id='profile-picture-container'>
        <img id='profile-picture' src='/dummy-images/profile-picture.png' />
      </div>
      <div id='greeting-message' className='mb-2'>
        <p className='text-center m-0 w-100'>Selamat datang,</p>
        <p id='account-display-name' className='text-center m-0 w-100'>Lorem Ipsum</p>
      </div>
      <div>
        <NavigationOption>
          <AccountIcon className='icon' />
          <p className='option-label'>Akun</p>
        </NavigationOption>
        <NavigationOption className='selected'>
          <AdminIcon className='icon' />
          <p className='option-label'>Admin</p>
        </NavigationOption>
        <NavigationOption>
          <MapIcon className='icon' />
          <p className='option-label'>Peta Digital</p>
        </NavigationOption>
        <NavigationOption>
          <ShopIcon className='icon' />
          <p className='option-label'>Toko</p>
        </NavigationOption>
        <NavigationOption>
          <MiscIcon className='icon' />
          <p className='option-label'>Lain-lain</p>
        </NavigationOption>
      </div>
    </Container>
  );
};

export default AdminSidebar;