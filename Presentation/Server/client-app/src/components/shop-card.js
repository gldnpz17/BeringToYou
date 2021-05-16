import { Card } from "react-bootstrap";
import styled from "styled-components";

const StyledCard = styled(Card)`
  font-family: 'Open Sans';
  color: black;
  box-shadow: ${props => props.theme.shadow} 0.2rem 0.2rem 0.4rem;

  border: none;
  overflow: hidden;
`;

const ShopCard = ({ image, name, category, style, className }) => {
  return (
    <StyledCard className={`m-0 ${className}`} style={style}>
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