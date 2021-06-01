import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import IconButton from "../components/icon-button";
import SearchTextBox from "../components/search-textbox";
import ShopCard from "../components/shop-card";
import ShopIcon from "../svg/shop-icon";
import FilterIcon from '../svg/filter-icon';

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
`;

const ShopListPage = () => {
  return (
    <StyledContainer className='p-0'>
      <div className='title d-flex flex-row px-2 mb-2 pt-2 align-items-center'>
        <ShopIcon style={{width: 'calc(1.375rem + 1.5vw)', height: 'calc(1.375rem + 1.5vw)'}} />
        <h1 className='ps-1 m-0'>Daftar Toko</h1>
      </div>
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