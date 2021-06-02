import { Card } from "react-bootstrap";
import styled from "styled-components";
import CustomCard from "./custom-card";

const StyledCard = styled(CustomCard)`
  font-family: 'Open Sans';
  color: black;
`;

const ContentContainer = styled(Card.Body)`
  padding: 0;
  display: grid;
`;

const ProductCategoryCard = ({ image, name, itemCount, style, className, onClick }) => {
  return (
    <StyledCard className={`m-0 ${className}`} style={style} onClick={onClick}>
      <Card.Body className='p-0 d-flex flex-column h-100 w-100'>
        <img className='flex-grow-1' src='dummy-images/vegetables.jpg' style={{objectFit: 'cover'}} />
        <div className='p-1'>
          <p className='m-0'><b>{name}</b></p>
          <p className='m-0'>123 Items</p>
        </div>
      </Card.Body>
    </StyledCard>
  );
};
  
export default ProductCategoryCard;