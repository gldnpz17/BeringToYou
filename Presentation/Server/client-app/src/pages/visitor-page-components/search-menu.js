import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import styled from "styled-components";
import CustomButton from "../../components/custom-button";
import SearchTextBox from "../../components/search-textbox";
import ShopCard from "../../components/shop-card"
import responsiveBreakpoints from "../../helpers/responsive-breakpoints";
import ShopFilterModal from "../../modals/shop-filter-modal";
import ShopOffCanvas from "./shop-offcanvas";

const Container = styled.div`
  height: 100%;

  overflow-x: hidden;
  overflow-y: scroll;
`;

const SearchContainer = styled.div`
  @media(min-width: ${responsiveBreakpoints.large}) {
    width: 50%;
  }
`;

const SearchMenu = () => {
  const [shopOffcanvasShow, setShopOffcanvasShow] = useState(false);
  const [filterModalShow, setFilterModalShow] = useState(false);

  return (
    <Container>
      <ShopFilterModal
        show={filterModalShow}
        setShow={setFilterModalShow}
      />
      <ShopOffCanvas showBackground={true} visible={shopOffcanvasShow} setVisible={setShopOffcanvasShow} />
      <SearchContainer className='px-3 py-2 d-flex flex-row'>
        <SearchTextBox className='mr-2' />
        <CustomButton onClick={() => setFilterModalShow(true)}>Filter</CustomButton>
      </SearchContainer>
      <Row xs={2} sm={3} md={4} lg={5} xl={6} className='d-flex justify-content-center mx-2'>
        {[...Array(20).keys()].map(key => {
          return (
            <Col className='p-2'>
              <ShopCard 
                onClick={() => setShopOffcanvasShow(!shopOffcanvasShow)}
                shop={{
                  name: 'Toko Lorem Ipsum',
                  category: 'Kategori Toko'
                }}
              />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default SearchMenu;