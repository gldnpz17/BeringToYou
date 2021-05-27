import React from 'react';
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import IconButton from "../components/icon-button";
import SearchTextBox from "../components/search-textbox";
import FilterIcon from "../svg/filter-icon";
import SearchIcon from "../svg/search-icon";
import ViewListIcon from '../svg/view-list-icon';
import ViewModulesIcon from '../svg/view-modules-icon';
import ProductCard from '../components/product-card';
import { useEffect, useState } from "react";
import DisplayOptions from '../helpers/display-options';
import ProductSearchOptionsOverlay from '../overlays/product-search-options-overlay';
import RadioIconButton from '../components/radio-icon-button';
import AnimatedSearchTextBox from '../components/animated-search-texbox';

const StyledContainer = styled(Container)`
  font-family: 'Roboto';
  min-height: inherit;

  background-color: ${props => props.theme.whitespace};

  .title {
    font-size: 2rem;

    svg {
      width: 2rem;
      height: 2rem;
      color: ${props => props.theme.primary}
    }
  }

  .search-result {
    font-size: 1.5rem;
  }
`;

const ProductSearchPage = () => {
  const [displayMode, setDisplayMode] = useState(DisplayOptions.productDisplayMode);
  const [filterOverlayVisible, setFilterOverlayVisible] = useState(false);

  const changeDisplayMode = (mode) => {
    setDisplayMode(mode);

    DisplayOptions.productDisplayMode = mode;
  }

  return (
    <StyledContainer className='p-0 mt-5 pt-3'>
      <ProductSearchOptionsOverlay visible={filterOverlayVisible} setVisible={setFilterOverlayVisible} />
      <div className='title d-flex flex-row px-2 align-items-center mb-2'>
        <SearchIcon style={{width: 'calc(1.375rem + 1.5vw)', height: 'calc(1.375rem + 1.5vw)'}} />
        <h1 className='m-0'>Cari Produk</h1>
      </div>

      <div className='mx-2 mb-2 d-flex flex-column'>
        <AnimatedSearchTextBox placeholders={[
          'Baju batik',
          'Bakpia',
          'Gula jawa'
        ]} className='mb-2' />
        <IconButton text='Filter & Urutkan' className='align-self-center' onClick={() => { setFilterOverlayVisible(true) }}>
          <FilterIcon style={{width: '1.6rem', height: '1.6rem'}} />
        </IconButton>
      </div>

      <p className='search-result text-center m-0'>Hasil Pencarian</p>
      <div className='d-flex flex-row justify-content-end mx-2 mb-1'>
        <RadioIconButton className='ms-2 p-1' iconOnly={true} onClick={() => changeDisplayMode('list')} 
          id='product-search-display-list' selectedId={`product-search-display-${displayMode}`}
        >
          <ViewListIcon style={{width: '1.6rem', height: '1.6rem'}} />
        </RadioIconButton>
        <RadioIconButton className='ms-2 p-1' iconOnly={true} onClick={() => changeDisplayMode('card')} 
          id='product-search-display-card' selectedId={`product-search-display-${displayMode}`}
        >
          <ViewModulesIcon style={{width: '1.6rem', height: '1.6rem'}}/>
        </RadioIconButton>
      </div>

      <Row className={`d-flex justify-content-center ${(DisplayOptions.productDisplayMode === 'list' ? 'row-cols-1' : 'row-cols-2 row-cols-lg-6')} mx-2`} >
        {
          [...Array(10).keys()].map(item => {
            return (
              <Col className={`${(displayMode === 'list' ? 'px-0' : 'px-1')} py-2`} >
                <ProductCard image='/dummy-images/vegetables.jpg' displayMode={displayMode} />
              </Col>
            );
          })
        }
      </Row>
    </StyledContainer>
  );
};

export default ProductSearchPage;