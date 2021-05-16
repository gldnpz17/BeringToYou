import { Button, CardDeck, Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import IconButton from "../components/icon-button";
import ProductCategoryCard from "../components/product-category-card";
import SearchTextBox from "../components/search-textbox";
import MapIcon from "../svg/map-icon";
import ShopIcon from '../svg/shop-icon';

const StyledContainer = styled(Container)`
  font-family: 'Roboto';
  color: ${props => props.theme.whitespace};

  #welcome-title {
    font-size: 2.5rem;
    line-height: 90%;
  }
  #welcome-subtitle {
    font-size: 1.25rem;
  }
  h2 {
    font-size: 1.25rem;
  }

  .content-text {
    text-shadow: ${props => props.theme.shadow} 0.05rem 0.01rem 0.2rem;
  }
`;

const StyledBackgroundDiv = styled.div`
  background: url('images/home-background.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  filter: blur(0.15rem) brightness(0.75);

  position: absolute;
  top: -10px;
  bottom: -10px;
  right: -10px;
  left: -10px;
`;

const StyledBackgroundContainerDiv = styled.div`
  z-index: -1;
  overflow: hidden;
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
`;

const StyledCardContainer = styled.div`
  overflow-x: scroll;
  white-space: nowrap;

  scrollbar-width: none;
  -ms-overflow-style: none; 
  scrollbar-width: none;
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

const Parallax = styled.div`
  perspective: 1px;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;
`;

const ParallexFront = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const ParallexBack = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  transform: translateZ(-1px) scale(3.5);
`;

const HomePage = () => {
  return (
    <Parallax>
      <ParallexBack>
       <StyledBackgroundContainerDiv>
          <StyledBackgroundDiv />
        </StyledBackgroundContainerDiv>
      </ParallexBack>
      <ParallexFront>
        <StyledContainer className='p-0 mt-5 pt-5'>
          <h1 id='welcome-title' className='content-text text-center m-0'>Selamat Datang!</h1>
          <p id='welcome-subtitle' className='content-text text-center m-0'>Butuh apa hari ini?</p>
          <div className='p-4'>
            <SearchTextBox placeholder='Cari produk' />
          </div>
          <div className='d-flex flex-row justify-content-center mb-4'>
            <IconButton text='Peta' className='mx-2'>
              <MapIcon style={{height: '1.6rem', width: '1.6rem'}} />
            </IconButton>
            <IconButton text='Toko' className='mx-2'>
              <ShopIcon style={{height: '1.6rem', width: '1.6rem'}} />
            </IconButton>
          </div>

          <h2 className='text-center'>Kategori Produk</h2>
          <StyledCardContainer className='px-3 mb-4'>
            <ProductCategoryCard name='Lorem' className='d-inline-block mx-1' style={{width: '8rem', height: '12rem'}} />
            <ProductCategoryCard name='Lorem' className='d-inline-block mx-1' style={{width: '8rem', height: '12rem'}} />
            <ProductCategoryCard name='Lorem' className='d-inline-block mx-1' style={{width: '8rem', height: '12rem'}} />
            <ProductCategoryCard name='Lorem' className='d-inline-block mx-1' style={{width: '8rem', height: '12rem'}} />
            <ProductCategoryCard name='Lorem' className='d-inline-block mx-1' style={{width: '8rem', height: '12rem'}} />
          </StyledCardContainer>

          <h2 className='text-center'>Lokasi Pasar</h2>
          <div className='mx-3'>
            <iframe
              height='500vh'
              width='100%'
              loading='lazy'
              allowfullscreen
              src='https://www.google.com/maps/embed/v1/place?q=place_id:ChIJYTfKAv73ei4RDEEL-U286zk&key=AIzaSyBtalCC-R8JSIvQMaIPRMubGYRaOtUbgpM'
            />
          </div>
        </StyledContainer>
      </ParallexFront>
    </Parallax>
  );
};

export default HomePage;