import { Card } from "react-bootstrap";
import styled from "styled-components";
import CustomCard from "./custom-card";

const StyledCard = styled(CustomCard)`
  font-family: 'Open Sans';
  color: black;

  border: none;
  overflow: hidden;
`;

const ShopCard = ({shop, className, ...props}) => {
  return (
    <StyledCard className={`m-0 ${className}`} {...props}>
      <Card.Body className='p-0 d-flex flex-column h-100'>
        <img className='flex-grow-1' src='dummy-images/food-stall.jpg' style={{objectFit: 'cover'}} />
        <div className='p-1'>
          <p className='m-0'><b>{shop?.name}</b></p>
          <p className='m-0'>{shop?.category}</p>
        </div>
      </Card.Body>
    </StyledCard>
  );
};
  
export default ShopCard;