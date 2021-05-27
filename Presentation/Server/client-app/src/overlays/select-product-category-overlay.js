import { Container } from "react-bootstrap";
import styled from "styled-components";
import ProductCategoryCard from "../components/product-category-card";

const OverlayContainer = styled.div`
  z-index: 2200;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  
  transition-duration: 0.3s;
`;

const OverlayBackground = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  background-color: rgba(0, 0, 0, 0.75);

  transition-duration: 0.3s;

  z-index: 2210;
`;

const OverlayContent = styled(Container)`
  position: relative;
  height: 100%;
  z-index: 2220;
  overflow: scroll;

  h1 {
    color: whitesmoke;
  }
`;

const SelectProductCategoryOverlay = ({ visible, setVisible }) => {
  return (
    <OverlayContainer style={{
        visibility: visible ? 'visible' : 'hidden',
        opacity: visible ? '100%' : '0%'
      }}
    >
      <OverlayBackground />
      <OverlayContent onClick={() => setVisible(false)}>
        <h1 className='mt-3 mb-2 text-center'>Kategori</h1>
        <div className='d-flex flex-row flex-wrap justify-content-center'>
          {
            [...Array(10).keys()].map(item => {
              return (
                <ProductCategoryCard name='Lorem' className='d-inline-block m-2' style={{
                  width: '8rem', 
                  height: '12rem',
                  position: 'relative',
                  zIndex: 2221
                }} onClick={(event) => event.stopPropagation()}/>
              );
            })
          }
        </div>
      </OverlayContent>
    </OverlayContainer>
  );
};

export default SelectProductCategoryOverlay;