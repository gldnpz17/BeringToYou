import styled from "styled-components";
import IconButton from "../../components/icon-button";
import CloseIcon from "../../svg/close-icon";
import LocationIcon from "../../svg/location-icon";

const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  z-index: 300;

  pointer-events: none;
`;

const Background = styled.div`
  transition-duration: 0.5s;

  pointer-events: auto;

  &.hidden {
    opacity: 0%;
    pointer-events: none;
  }

  display: ${props => props.showBackground ? 'auto': 'none'};

  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: ${props => props.showBackground ? '0': '100%'};
  z-index: 0;

  background-color: black;
  opacity: 50%;
`;

const Content = styled.div`
  transition-duration: 0.5s;

  &.hidden {
    left: -20rem;
  }

  pointer-events: auto;

  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100;

  width: 20rem;
  max-width: 100vw;

  background-color: ${props => props.theme.whitespace};

  font-family: 'Open Sans';

  box-shadow: ${props => props.theme.shadow} 0.1rem 0rem 0.2rem;
`;

const Close = styled(CloseIcon)`
  transition-duration: 0.25s;

  width: 2.4rem;
  height: 2.4rem;

  margin-top: 0.3rem;
  margin-right: 0.3rem;

  opacity: 75%;

  color: white;

  :hover {
    filter: brightness(60%);
  }

  position: absolute;
  top: 0;
  right: 0;
`;

const Location = styled(LocationIcon)`
  transition-duration: 0.25s;

  width: 2.4rem;
  height: 2.4rem;

  margin-right: 0.3rem;

  opacity: 75%;

  color: white;

  :hover {
    filter: brightness(60%);
  }

  position: absolute;
  bottom: calc(1.6rem + (0.3rem)*2 + 0.6rem);
  right: 0;
`;

const ImageContainer = styled.div`
  position: relative;
  box-shadow: ${props => props.theme.shadow} 0rem 0.05rem 0.08rem;

  img {
    position: relative;

    height: 16rem;
    width: 100%;
    object-fit: cover;

    z-index: -10;
  }

  h1 {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;

    font-size: 1.6rem;

    padding: 0.3rem 0.5rem;
    margin-bottom: 0;

    color: black;

    ::after {
      content: '';

      background-color: white;
      opacity: 70%;

      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;

      z-index: -1;
    }
  }
`;

const ShopDetails = styled.div`
  overflow-y: scroll;
`;

const OnlineShopList = styled.ul`
  padding-left: 0;
`;

const OnlineShop = styled.li`
  transition-duration: 0.2s;

  padding: 0.3rem;
  margin-bottom: 0.25rem;

  border-color: black;
  border-radius: 0.25rem;
  border-style: solid;
  border-width: 0.075rem;

  :hover {
    transform: scale(101.5%);
  }

  img {
    width: 1.1rem;
    height: 1.1rem;

    margin-right: 0.2rem;
  }

  a {
    margin-bottom: 0;
    font-size: 1rem;

    color: black;
  }
`;

const ShopOffCanvas = ({shop, showBackground, visible, setVisible, ...props}) => {
  return (
    <Container {...props}>
      <Background className={visible ? '' : 'hidden'} 
        showBackground={showBackground} 
        onClick={() => {
          if (showBackground) {
            setVisible(false);
          }
        }}
      />
      <Content className={`d-flex flex-column ${visible ? '' : 'hidden'}`}>
        <ImageContainer>
          <img src='/dummy-images/food-stall.jpg' />
          <h1>Toko Lorem Ipsum</h1>
          <Close onClick={() => setVisible(false)} />
          <Location />
        </ImageContainer>
        <ShopDetails className='d-flex flex-column flex-grow-1 p-2 pr-3'>
          <p className='mb-1 mt-2'><b>Rentang Harga: </b>Rp42000 - Rp69000</p>
          <p className='mb-1'><b>Toko Online :</b></p>
          <OnlineShopList className='mb-3'>
            <OnlineShop className='d-flex flex-row align-items-center'>
              <img src='/dummy-images/shopee-logo.png' />
              <a href='/nowhere'>Shopee (Toko Lorem)</a>
            </OnlineShop>
            <OnlineShop className='d-flex flex-row align-items-center'>
              <img src='/dummy-images/tokopedia-logo.jpg' />
              <a href='/nowhere'>Tokopedia (Toko Lorem 123)</a>
            </OnlineShop>
            <OnlineShop className='d-flex flex-row align-items-center'>
              <img src='/dummy-images/shopee-logo.png' />
              <a href='/nowhere'>Shopee (Toko Lorem Alt)</a>
            </OnlineShop>
          </OnlineShopList>
          <p className='mb-1'><b>Kategori : </b>{shop?.category ?? 'N/A'}</p>
          <p className='mb-2'><b>Pemilik : </b>{shop?.owner ?? 'N/A'}</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam a magna vulputate, iaculis metus et, ornare erat. Quisque quis vulputate orci, a commodo nibh. Suspendisse potenti. Quisque ex elit, porttitor vitae metus sed, vehicula aliquet dui. Nullam eu sem vitae urna fringilla rutrum in ut nisi. Aliquam pharetra ex non leo commodo varius. Sed lectus leo, convallis in maximus rhoncus, commodo ac nunc. Vivamus vulputate varius pulvinar. Ut rhoncus diam eget egestas commodo. Fusce dapibus sed magna eu aliquet. Donec dignissim nunc vel massa aliquam, et gravida orci tempus. In ac lorem id nunc imperdiet finibus vel vel diam.</p>
        </ShopDetails>
      </Content>
    </Container>
  );
};

export default ShopOffCanvas;