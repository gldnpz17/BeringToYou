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

  &.display-list {
    display: flex;
    flex-direction: row;
    align-items: stretch;

    .item-image {
      width: 3.5rem;
      height: 3.5rem;
      object-fit: cover;
      margin-right: 0.5rem;
    }

    .item-info-container {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      width: 100%;
    }

    .item-title,.item-shop,.item-price {
      margin: 0;
    }

    .item-shop {
      flex-grow: 1;
    }

    .item-price {
      text-align: end;
    }
  }

  &.display-card {
    padding: 0;
    display: flex;
    flex-direction: column;
    height: 100%;

    .item-image {
      flex-grow: 1;
      object-fit: cover;
      width: 100%;
    }

    .item-info-container {
      padding: 0.5rem;
    }

    .item-title,.item-shop,.item-price {
      margin: 0;
    }

    .item-shop {
      margin-bottom: 0.5rem;
    }

    .item-price {
      text-align: end;
    }
  }
`;

const ProductCard = ({ image, productName, shopName, price, displayMode, style, className }) => {
  return (
    <StyledCard className={`m-0 ${className}`} style={style} onClick={() => window.location.href='/produk/idproduk'}>
      <StyledListCardBody className={`display-${displayMode}`}>
        <img src={image} className='item-image' />
        <div className='item-info-container' >
          <p className='item-title'>Lorem Ipsum</p>
          <p className='item-shop'>Toko Lorem</p>
          <p className='item-price'>Rp 12.345</p>
        </div>
      </StyledListCardBody>
    </StyledCard>
  );
};

export default ProductCard;