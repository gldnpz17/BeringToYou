import styled from "styled-components";
import NavMenuItem from '../components/nav-menu-item';
import HomeIcon from '../svg/home-icon';
import MapIcon from "../svg/map-icon";
import SearchIcon from "../svg/search-icon";
import ShopIcon from "../svg/shop-icon";
import AdminIcon from '../svg/admin-icon';

const Container = styled.div`
  height: 0%;
  width: 100%;
  z-index: 1;
  position: fixed;
  left: 0;
  top: 0;
  background-color:  rgba(0, 0, 0, 0.85);
  
  transition: 0.5s;

  color: whitesmoke;
`;

const Content = styled.div`
  z-index: 2;

  p {
    font-weight: lighter;
    font-size: 1.8rem;
    line-height: 90%;
  }

  svg {
    color: ${props => props.theme.secondary};
    width: 2.4rem;
    height: 2.4rem;
  }
`;

const NavigationOverlay = ({ id }) => {
  return (
    <Container id={id} className='d-flex justify-content-center align-items-center overflow-hidden'>
      <Content>
        <NavMenuItem name='Beranda' href='/'>
          <HomeIcon />
        </NavMenuItem>
        <NavMenuItem name='Cari Produk' href='/produk'>
          <SearchIcon />
        </NavMenuItem>
        <NavMenuItem name='Toko' href='/toko'>
          <ShopIcon />
        </NavMenuItem>
        <NavMenuItem name='Peta Digital'>
          <MapIcon />
        </NavMenuItem>
        <NavMenuItem name='Administrasi'>
          <AdminIcon />
        </NavMenuItem>
      </Content>
    </Container>
  );
};

export default NavigationOverlay;