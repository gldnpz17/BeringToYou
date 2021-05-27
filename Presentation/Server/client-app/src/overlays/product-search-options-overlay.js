import styled from "styled-components";
import FilterIcon from "../svg/filter-icon";
import SortIcon from '../svg/sort-icon';
import FilterVariantIcon from '../svg/filter-variant-icon';
import SortVariantIcon from '../svg/sort-variant-icon';
import Chip from '../components/chip';
import TuneIcon from '../svg/tune-icon';
import IconButton from "../components/icon-button";
import AddcategoryIcon from "../svg/add-category-icon";
import { Form } from "react-bootstrap";
import FormRadio from '../components/form-radio';
import CustomButton from '../components/custom-button';
import SelectProductCategoryOverlay from "./select-product-category-overlay";
import { useState } from "react";

const OverlayContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 2010;

  height: 100%;
  width: 100%;
`;

const ContentContainer = styled.div`
  position: relative;
  background-color: ${props => props.theme.whitespace};

  z-index: 2020;

  width: 18rem;

  transition: 0.5s;

  h1 {
    font-size: 1.6rem;

    svg {
      width: 1.6rem;
      height: 1.6rem;
    }
  }

  h2 {
    font-size: 1.2rem;
  }

  h2 > svg {
    color: ${props => props.theme.primary}
  }
`;

const OverlayBackground = styled.div`
  position: absolute;
  z-index: -1;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  transition-duration: 0.5s;

  background-color: rgba(0, 0, 0, 90%);
`;

const ProductSearchOptionsOverlay = ({ setVisible, visible }) => {
  const [categoryOverlayVisible, setCategoryOverlayVisible] = useState(false);

  return (
    <OverlayContainer className='d-flex flex-row justify-content-end'
      style={{
        visibility: visible ? 'visible' : 'hidden'
      }}
    >
      <SelectProductCategoryOverlay visible={categoryOverlayVisible} setVisible={setCategoryOverlayVisible} />
      <OverlayBackground onClick={() => { setVisible(false) }}
        style={{
          opacity: visible ? '100%' : '0%'
        }}
      />
      <ContentContainer style={{
        left: visible ? '0rem' : '18rem'
      }} className='d-flex flex-column'>
        <h1 className='text-center m-1 d-flex align-items-center'>
          <TuneIcon className='me-1' />
          Filter & Urutkan
        </h1>
        <section className='p-2 pt-0'>
          <h2>Kategori</h2>
          <div className='d-flex flex-row flex-wrap'>
            {
              ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur'].map((item, index) => {
                return (
                  <Chip className='ms-1 mb-1' categoryName={item} />
                );
              })
            }
          </div>
          <div className='d-flex justify-content-center m-1'>
            <IconButton text='Tambah Kategori' onClick={() => {
              setCategoryOverlayVisible(true);
            }}>
              <AddcategoryIcon style={{width: '1.2rem', height: '1.2rem'}} />
            </IconButton>
          </div>
        </section>
        <hr className='my-1' />
        <section className='p-2'>
          <h2>Rentang Harga</h2>
          <Form.Group className='mb-3'>
            <Form.Label>Minimal</Form.Label>
            <div className='d-flex flex-row align-items-center'>
              <p className='m-0 me-2'>Rp</p>
              <Form.Control size='sm' className='flex-grow-1' placeholder='10000' />
            </div>
          </Form.Group>
          <Form.Group>
            <Form.Label>Maksimal</Form.Label>
            <div className='d-flex flex-row align-items-center'>
              <p className='m-0 me-2'>Rp</p>
              <Form.Control size='sm' className='flex-grow-1' placeholder='50000' />
            </div>
          </Form.Group>
        </section>
        <hr className='my-1' />
        <section className='p-2'>
          <h2>Urutkan</h2>
          <p className='m-0'>Urutkan berdasarkan</p>
          <Form.Group>
            <FormRadio label='Harga (terendah ke tertinggi)' name='product-sort-chk' id='sort-product-price-by-lowest' />
            <FormRadio label='Harga (tertinggi ke terendah)' name='product-sort-chk' id='sort-product-price-by-highest' />
            <FormRadio label='Terbaru' name='product-sort-chk' id='sort-product-newest' />
            <FormRadio label='Terlama' name='product-sort-chk' id='sort-product-oldest' />
          </Form.Group>
        </section>
        <div className='flex-grow-1' />
        <CustomButton className='mx-2 mb-3' onClick={() => setVisible(false) }>Terapkan</CustomButton>
      </ContentContainer>
    </OverlayContainer>
  );
};

export default ProductSearchOptionsOverlay;