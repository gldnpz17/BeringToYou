import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import IconButton from "../components/icon-button";
import SearchTextBox from "../components/search-textbox";
import ShopCard from "../components/shop-card";
import ShopIcon from "../svg/shop-icon";
import FilterIcon from '../svg/filter-icon';
import VisitorPageTitleContainer from "../components/visitor-page-title-container";
import { useEffect, useState } from "react";

const StyledContainer = styled(Container)`
  font-family: 'Open Sans';
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
`;

const ShopListPage = () => {
  const searchCriteria = useState({
    keywords: [],
    categoryId: null,
    start: 0,
    count: 30
  });

  useEffect(() => {

  }, [searchCriteria])

  const getShopDatas = async () => {
    
  };

  return (
    <StyledContainer className='p-0'>
      <VisitorPageTitleContainer>
        <ShopIcon/>
        <h1>Daftar Toko</h1>
      </VisitorPageTitleContainer>
      <div className='mx-2 mb-4 d-flex flex-column'>
        <SearchTextBox placeholder='Cari Toko' className='mb-3' />
        <IconButton text='Filter & Urutkan' className='align-self-center'>
          <FilterIcon style={{width: '1.6rem', height: '1.6rem'}} />
        </IconButton>
      </div>
      <Row className='row-cols-2 mx-2'>
        <Col className='px-1 py-2'>
          <ShopCard name='Warung Bu Lorem' />
        </Col>
        <Col className='px-1 py-2'>
          <ShopCard name='Warung Pak Ipsum' />
        </Col>
        <Col className='px-1 py-2'>
          <ShopCard name='Warung Bu Lorem' />
        </Col>
        <Col className='px-1 py-2'>
          <ShopCard name='Warung Pak Ipsum' />
        </Col>
        <Col className='px-1 py-2'>
          <ShopCard name='Warung Bu Lorem' />
        </Col>
        <Col className='px-1 py-2'>
          <ShopCard name='Warung Pak Ipsum' />
        </Col>
        <Col className='px-1 py-2'>
          <ShopCard name='Warung Bu Lorem' />
        </Col>
        <Col className='px-1 py-2'>
          <ShopCard name='Warung Pak Ipsum' />
        </Col>
        <Col className='px-1 py-2'>
          <ShopCard name='Warung Bu Lorem' />
        </Col>
        <Col className='px-1 py-2'>
          <ShopCard name='Warung Pak Ipsum' />
        </Col>
      </Row>
    </StyledContainer>
  );
}

export default ShopListPage;