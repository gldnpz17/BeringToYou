import { useEffect } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import FailSafeImg from "../../components/fail-safe-img";
import CloseIcon from "../../svg/close-icon";
import LocationIcon from "../../svg/location-icon";
import WhatsappIcon from "../../svg/whatsapp-icon";
import ReactGA from 'react-ga';

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

  display: ${props => props.showBackground ? 'auto' : 'none'};

  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: ${props => props.showBackground ? '0' : '100%'};
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
  overflow: hidden;

  img {
    position: relative;

    height: 16rem;
    width: 20rem;
    max-width: 100vw;
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

const ExternalLinkList = styled.ul`
  padding-left: 0;
`;

const ExternalLinkItem = styled.li`
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

  a, p {
    margin-bottom: 0;
    font-size: 1rem;

    color: black;
  }
`;

const ShopOffCanvas = ({ history, shop, showBackground, canJumpToLocation, visible, setVisible, onDismiss, ...props }) => {
  useEffect(() => {
    if (shop) {
      ReactGA.modalview(`shop-modal/${shop.id}_${shop.name}`);
    }
  }, [shop])
  
  return (
    <Container {...props}>
      <Background className={visible ? '' : 'hidden'}
        showBackground={showBackground}
        onClick={() => {
          if (showBackground) {
            onDismiss ? onDismiss() : setVisible(false)
          }
        }}
      />
      <Content className={`d-flex flex-column ${visible ? '' : 'hidden'}`}>
        <ImageContainer>
          <FailSafeImg
            src={`/api/public/assets/${shop?.bannerImage?.thumbnailFilename}`}
            altsrc={`/assets/imagenotfound.png`}
          />
          <h1>{shop?.name}</h1>
          <Close onClick={() => onDismiss ? onDismiss() : setVisible(false)} />
          {canJumpToLocation ?
            <Location onClick={() => {
              history.push(`/map?shopfocus=${shop?.id}`);
            }} />
            : null
          }
        </ImageContainer>
        <ShopDetails className='d-flex flex-column flex-grow-1 p-2 pr-3'>
          <p className='mb-1 mt-2'><b>Rentang Harga: </b>{`Rp ${shop?.minPrice} - Rp ${shop?.maxPrice}`}</p>
          <p className='mb-1'><b>Toko Online :</b></p>
          <ExternalLinkList className='mb-3'>
            {(() => {
              if (shop?.onlineShopInstances.length > 0) {
                return (
                  shop?.onlineShopInstances?.map(onlineShop => {
                    return (
                      <ExternalLinkItem className='d-flex flex-row align-items-center'>
                        <FailSafeImg
                          src={`/api/public/assets/${onlineShop?.platform?.iconFilename}`}
                          altsrc={`/assets/imagenotfound.png`}
                        />
                        <a href={onlineShop?.url}>{`${onlineShop?.platform?.name} (${onlineShop?.name})`}</a>
                      </ExternalLinkItem>
                    );
                  })
                );
              } else {
                return (
                  <p className='text-muted mb-0'>Tidak ada toko online.</p>
                );
              }
            })()}
          </ExternalLinkList>
          <p className='mb-1'><b>Kontak</b></p>
          <ExternalLinkList className='mb-3'>
            {(() => {
              if (shop?.whatsappContacts.length > 0) {
                return (
                  shop?.whatsappContacts?.map(contact => {
                    return (
                      <ExternalLinkItem className='d-flex flex-row align-items-center'>
                        <FailSafeImg 
                          src={`/assets/contact-icons/whatsapp.svg`}
                          altsrc='/assets/imagenotfound.png'
                        />
                        {(contact.contactUrl) ? <a href={contact.contactUrl}>{contact.contactIdentity}</a> : <p>{contact.contactIdentity}</p>}
                      </ExternalLinkItem>
                    );
                  })
                );
              } else {
                return (
                  <p className='text-muted mb-0'>Tidak ada kontak.</p>
                );
              }
            })()}
          </ExternalLinkList>
          <p className='mb-1'><b>Kategori : </b>{shop?.category?.name ?? 'N/A'}</p>
          <p><b>Subkategori : </b>{(shop?.subcategories.length > 0) ? shop?.subcategories?.map(subcategory => {
            return subcategory.name
          }).join(', ') : 'N/A'}</p>
          <p className='mb-2'><b>Pemilik : </b>{shop?.ownerNames?.length > 0 ? shop?.ownerNames?.join(', ') : 'N/A'}</p>
          <p>{shop?.description}</p>
        </ShopDetails>
      </Content>
    </Container>
  );
};

export default withRouter(ShopOffCanvas);