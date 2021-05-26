import { Card } from "react-bootstrap";
import styled from "styled-components";
import ViewProductOverlay from "../overlays/view-product-overlay";
import CustomCard from './custom-card';

const StyledCard = styled(CustomCard)`
  font-family: 'Roboto';
  color: black;

  p {
    line-height: 98%;
  }

  .item-title {
    font-size: 1.2rem;
  }

  .item-shop {
    color: gray;
  }

  .item-price {

  }

  img {
    box-shadow: ${props => props.theme.shadow} 0 0.05rem 0.2rem;
  }
`;

const StyledListCardBody = styled(Card.Body)`
  padding: 0.75rem;
`;

const ProductCard = ({ image, productName, shopName, price, displayMode, style, className }) => {
  const getCardBody = () => {
    if (displayMode === 'list') {
      return (
        <StyledListCardBody className='d-flex flex-row align-item-top'>
          <img src={image} className='me-2' style={{width: '3.5rem', height: '3.5rem', objectFit: 'cover'}} />
          <div className='flex-grow-1 d-flex flex-column' style={{width: '100%'}}>
            <p className='m-0 item-title'>Lorem Ipsum</p>
            <p className='m-0 item-shop flex-grow-1'>Toko Lorem</p>
            <p className='m-0 text-end item-price'>Rp 12.345</p>
          </div>
        </StyledListCardBody>
      );
    } else if (displayMode === 'card') {
      return (
        <Card.Body className='p-0 d-flex flex-column h-100'>
          <img className='flex-grow-1' src={image} style={{objectFit: 'cover'}} />
          <div className='p-1'>
            <p className='m-0 item-title'>Lorem Ipsum</p>
            <p className='m-0 item-shop flex-grow-1'>Toko Lorem</p>
            <p className='m-0 text-end item-price'>Rp 12.345</p>
          </div>
        </Card.Body>
      );
    } else {
      throw new Error('Invalid displayMode.');
    }
  };

  const showViewProductOverlay = () => {
    document.getElementById('view-product-overlay').style.opacity = 1.0;
    document.getElementById('view-product-overlay').style.visibility = 'visible';
  }

  return (
    <StyledCard className={`m-0 ${className}`} style={style} onClick={() => window.location.href='/produk/idproduk'}>
      {getCardBody()}
    </StyledCard>
  );
};

export default ProductCard;