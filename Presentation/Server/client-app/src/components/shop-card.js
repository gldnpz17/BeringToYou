import { Card } from "react-bootstrap";
import styled from "styled-components";
import CustomCard from "./custom-card";

const StyledCard = styled(CustomCard)`
  font-family: 'Open Sans';
  color: black;

  border: none;
  overflow: hidden;
`;

const ShopCard = ({ image, name, category, style, className }) => {
  return (
    <StyledCard className={`m-0 ${className}`} style={style} onClick={() => window.location.href = '/toko/warung-lorem-ipsum' }>
      <Card.Body className='p-0 d-flex flex-column h-100'>
        <img className='flex-grow-1' src='dummy-images/food-stall.jpg' style={{objectFit: 'cover'}} />
        <div className='p-1'>
          <p className='m-0'><b>{name}</b></p>
          <p className='m-0'>Makanan & Jajanan</p>
        </div>
      </Card.Body>
    </StyledCard>
  );
};
  
export default ShopCard;