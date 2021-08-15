import styled from "styled-components";
import ArrowCollapseLeftIcon from '../svg/arrow-collapse-left-icon'; 
import AccountIcon from '../svg/account-icon';
import AdminIcon from '../svg/admin-icon';
import MapIcon from '../svg/map-icon';
import ShopIcon from '../svg/shop-icon';
import MiscIcon  from '../svg/misc-icon';
import ChevronDoubleLeftIcon from '../svg/chevron-double-left-icon';
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import AdminSidebarDisplay from '../helpers/admin-sidebar-display';
import AccountsIcon from "../svg/accounts-icon";
import { IdentityContext } from "../app";
import FailSafeImg from "./fail-safe-img";

const Container = styled.div`
  z-index: 10;

  background-color: ${props => props.theme.adminSidebar};
  box-shadow: ${props => props.theme.shadow} 0rem 0rem 0.3rem;

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
        box-shadow: ${props => props.theme.shadow} 0.07rem 0rem 0.2rem;

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

    color: black;
    font-family: 'Open Sans';
  }

  #profile-picture-container {
    position: relative;

    height: 5rem;
  }

  #profile-picture {
    transition-duration: 0.5s;
    box-shadow: ${props => props.theme.shadow} 0.03rem 0.075rem 0.1rem;

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

const NavigationOption = styled.a`
  padding: 0.5rem;
  position: relative;
  text-decoration: none;
  z-index: 12;

  display: flex;
  flex-direction: row;
  align-items: center;

  font-family: 'Open Sans';

  .option-label {
    transition-duration: 0.5s;
    white-space: nowrap;

    max-width: 100vw;
    margin-right: 5rem;
    margin-left: 0.5rem;
    margin-bottom: 0;
    overflow: hidden;
    color: black;
  }

  .icon {
    color: ${props => props.theme.primary};
  }

  ::after {
    content: '';

    opacity: 0;

    position: absolute;
    left: 0;
    right: -0.25rem;
    top: 0;
    bottom: 0;
    z-index: -1;

    border-top-right-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;

    background-color: ${props => props.theme.primary};
  }

  &.selected, &:hover {
    .option-label {
      color: white;
    }

    .icon {
      color: ${props => props.theme.primaryDark};
    }

    ::after {
      opacity: 100%;
      box-shadow: ${props => props.theme.shadow} 0rem 0.03rem 0.1rem;
    }
  }

  &:hover:not(.selected) {
    opacity: 85%;
  }
`;

const MinimizeSidebarButton = styled.div`
  position: relative;

  .icon {
    position: relative;

    transition: left 0.6s, transform 0.3s linear 0.15s, color 0.3s;

    color: ${props => props.theme.primary};

    left: 100%;
    transform: translateX(-150%);

    margin: 0.5rem;

    &:hover {
      filter: brightness(90%);
    }
  }
`;

const AdminSidebar = (props) => {
  const [minimized, setMinimized] = useState(AdminSidebarDisplay.minimized);
  const identityContext = useContext(IdentityContext);

  let { page } = useParams();

  const toggleMinimized = () => {
    if (minimized) {
      setMinimized(false);

      AdminSidebarDisplay.minimized = false;
    } else {
      setMinimized(true);

      AdminSidebarDisplay.minimized = true;
    }
  };

  return (
    <Container {...props} className={`${props.className ?? ''} ${minimized ? 'minimized' : ''}`}>
      <MinimizeSidebarButton id='minimize-button'>
        <ChevronDoubleLeftIcon className='icon' onClick={() => toggleMinimized()} />
      </MinimizeSidebarButton>
      <div id='profile-picture-container'>
        <FailSafeImg id='profile-picture' 
          src={`/api/accounts/${identityContext.identity?.accountId}/profile-picture`}
          altsrc='/admin-assets/no-profile-picture.png'
        />
      </div>
      <div id='greeting-message' className='mb-2'>
        <p className='text-center m-0 w-100'>Selamat datang,</p>
        <p id='account-display-name' className='text-center m-0 w-100'>{identityContext?.identity?.displayName}</p>
      </div>
      <div>
        <NavigationOption className={`${(page === 'akun-pribadi') ? 'selected' : ''}`}
          href='/admin/akun-pribadi'
        >
          <AccountIcon className='icon' />
          <p className='option-label'>Akun Pribadi</p>
        </NavigationOption>
        {identityContext?.identity?.adminPermissions?.canManageAccounts || identityContext?.identity?.adminPermissions?.canManagePermissions ? 
          <NavigationOption className={`${(page === 'manajemen-akun') ? 'selected' : ''}`}
            href='/admin/manajemen-akun'
          >
            <AccountsIcon className='icon' />
            <p className='option-label'>Manajemen Akun</p>
          </NavigationOption>
        : null}
        {identityContext?.identity?.adminPermissions?.canManageMap ?
          <NavigationOption className={`${(page === 'peta-digital') ? 'selected' : ''}`}
            href='/admin/peta-digital'
          >
            <MapIcon className='icon' />
            <p className='option-label'>Peta Digital</p>
          </NavigationOption>
        : null}
        {identityContext?.identity?.adminPermissions?.canManageShops || identityContext?.identity?.isMerchant ?
          <NavigationOption className={`${(page === 'toko') ? 'selected' : ''}`}
            href='/admin/toko'
          >
            <ShopIcon className='icon' />
            <p className='option-label'>Toko</p>
          </NavigationOption>
        : null}
        <NavigationOption className={`${(page === 'lain-lain') ? 'selected' : ''}`}
          href='/admin/lain-lain'
        >
          <MiscIcon className='icon' />
          <p className='option-label'>Lain-lain</p>
        </NavigationOption>
      </div>
    </Container>
  );
};

export default AdminSidebar;