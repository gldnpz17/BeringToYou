import React, { useState } from 'react';
import { useEffect } from "react";
import { Card, Col, Container, Nav, Row, Tab } from "react-bootstrap";
import styled from "styled-components";
import IconButton from "../components/icon-button";
import ProductCard from "../components/product-card";
import LocationIcon from "../svg/location-icon";
import ViewListIcon from "../svg/view-list-icon";
import ViewModulesIcon from "../svg/view-modules-icon";
import DisplayOptions from '../helpers/display-options';
import RadioIconButton from '../components/radio-icon-button';

const StyledContainer = styled(Container)`
  font-family: 'Open Sans';
  min-height: inherit;

  background-color: ${props => props.theme.whitespace};
`;

const StyledHeroImage = styled.img`
  width: 100%;
`;

const StyledShopNameBackground = styled.div`
  background-color: ${props => props.theme.semiTransparentWhite};
  z-index: -1;
  position: absolute;
  top: -10px;
  bottom: -10px;
  left: -10px;
  right: -10px;

  filter: blur(0.1rem);
`;

const ShopNameContainer = styled.div`
  overflow: hidden;
  z-index: 1;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  h1 {
    font-size: 1.6rem;
  }
`;

const ContentContainer = styled.div`
  background-color: ${props => props.theme.whitespace};
`;

const RoundedCorner = styled.div`
  background-color: ${props => props.theme.whitespace};

  position: absolute;
  height: 1rem;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  border-top-right-radius: 1rem;
  border-top-left-radius: 1rem;
`;

const StyledNavItem = styled(Nav.Item)`
  a {
    position: relative;
    color: black;
    font-size: 1.2rem;

    .underline {
      position: absolute;
      bottom: 0.05rem;
      left: 0;
      right: 0;

      height: 0.1rem;
      background-color: lightgray;
    }

    .selection-underline {
      position: absolute;
      bottom: 0;
      left: 40%;
      right: 40%;

      height: 0;
      background-color: ${props => props.theme.secondary};
      width: 20%;
      transition: 0.4s;
    }
  }

  a[aria-selected=true] {
    color: ${props => props.theme.secondary};

    .selection-underline {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;

      width: 100%;
      height: 0.2rem;
      transition: 0.4s;
    }
  }
`;

const StyledShopDescriptionText = styled.p`
  font-family: 'Open Sans';
`;

const ShopProfilePage = () => {
  const [displayMode, setDisplayMode] = useState(DisplayOptions.productDisplayMode);

  const changeDisplayMode = (mode) => {
    setDisplayMode(mode);

    DisplayOptions.productDisplayMode = mode;
  }

  return (
    <StyledContainer className='p-0 d-flex flex-column'>
      <div>
        <div style={{ position: 'relative' }}>
          <StyledHeroImage src='/dummy-images/food-stall.jpg' />
          <ShopNameContainer className='pb-2'>
            <StyledShopNameBackground className='p-2' />
            <h1 className='mt-2 ml-2 mb-3 ps-2' style={{ zIndex: '1' }}>Warung Lorem Ipsum</h1>
          </ShopNameContainer>
          <RoundedCorner />
        </div>
      </div>
      <ContentContainer className='flex-grow-1 mx-3'>
        <Tab.Container defaultActiveKey='profile'>
          <Nav className='d-flex align-items-center mb-2'>
            <StyledNavItem className='flex-grow-1 p-0'>
              <Nav.Link className='text-center p-0' eventKey='profile'>
                <p className='p-1 m-0'>Profil Toko</p>
                <div className='underline' />
                <div className='selection-underline' />
              </Nav.Link>
            </StyledNavItem>
            <StyledNavItem className='flex-grow-1 p-0'>
              <Nav.Link className='text-center p-0' eventKey='product-list'>
                <p className='p-1 m-0'>Daftar Produk</p>
                <div className='underline' />
                <div className='selection-underline' />
              </Nav.Link>
            </StyledNavItem>
          </Nav>
          <Tab.Content className='pb-4'>
            <Tab.Pane eventKey='profile'>
              <div className='d-flex flex-column'>
                <StyledShopDescriptionText>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec egestas ante. Pellentesque eget nibh ac tortor hendrerit lacinia eu eu ex. Ut velit urna, porta mollis turpis sit amet, semper rutrum lectus. Integer vitae ligula a ligula porta mollis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus mollis dui eget neque lobortis faucibus. Praesent molestie quis odio sit amet condimentum. Nunc quis metus tortor. Aliquam in efficitur velit, ut tincidunt nunc. Duis in dignissim tortor. Suspendisse in magna nisi.
                </StyledShopDescriptionText>
                <IconButton text='Lihat lokasi' className='align-self-end'>
                  <LocationIcon style={{ width: '1.6rem', height: '1.6rem' }} />
                </IconButton>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey='product-list'>
              <div className='d-flex flex-column'>
                <div className='d-flex flex-row justify-content-end'>
                  <RadioIconButton className='ml-2 p-1' iconOnly={true} onClick={() => changeDisplayMode('list')}
                    id='shop-profile-display-list' selectedId={`shop-profile-display-${displayMode}`}
                  >
                    <ViewListIcon style={{ width: '1.6rem', height: '1.6rem' }} />
                  </RadioIconButton>
                  <RadioIconButton className='ml-2 p-1' iconOnly={true} onClick={() => changeDisplayMode('card')}
                    id='shop-profile-display-card' selectedId={`shop-profile-display-${displayMode}`}
                  >
                    <ViewModulesIcon style={{ width: '1.6rem', height: '1.6rem' }} />
                  </RadioIconButton>
                </div>

                <Row className={`${(displayMode === 'list' ? 'row-cols-1' : 'row-cols-2')} mx-0`}>
                  {
                    [...Array(10).keys()].map(item => {
                      return (
                        <Col className={`${(displayMode === 'list' ? 'px-0' : 'px-1')} py-2`}>
                          <ProductCard image='/dummy-images/vegetables.jpg' displayMode={displayMode} />
                        </Col>
                      );
                    })
                  }
                </Row>
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </ContentContainer>
    </StyledContainer>
  );
};

export default ShopProfilePage;