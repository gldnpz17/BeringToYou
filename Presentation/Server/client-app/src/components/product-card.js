import { Card } from "react-bootstrap";
import styled from "styled-components";

const StyledCard = styled(Card)`
  font-family: 'Roboto';
  color: black;
  box-shadow: ${props => props.theme.shadow} 0 0.2rem 0.4rem;

  border: none;
  overflow: hidden;

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
          <img className='flex-grow-1' src='dummy-images/vegetables.jpg' style={{objectFit: 'cover'}} />
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
  }

  return (
    <StyledCard className={`m-0 ${className}`} style={style}>
      {getCardBody()}
    </StyledCard>
  );
};

export default ProductCard;