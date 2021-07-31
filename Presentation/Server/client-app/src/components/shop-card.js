import { Card } from "react-bootstrap";
import styled from "styled-components";
import CustomCard from "./custom-card";
import FailSafeImg from "./fail-safe-img";

const StyledCard = styled(CustomCard)`
  font-family: 'Open Sans';
  color: black;

  border: none;
  overflow: hidden;

  img {
    width: 100%;
    object-fit: contain;
  }
`;

const ShopCard = ({shop, className, ...props}) => {
  return (
    <StyledCard className={`m-0 ${className}`} {...props}>
      <Card.Body className='p-0 d-flex flex-column h-100'>
        <FailSafeImg 
          className='flex-grow-1'
          src={`api/public/assets/${shop?.bannerImage?.thumbnailFilename}`} 
          altsrc={`assets/imagenotfound.png`}
        />
        <div className='p-1'>
          <p className='m-0'><b>{shop?.name}</b></p>
          <p className='m-0'>{shop?.shopCategoryName}</p>
        </div>
      </Card.Body>
    </StyledCard>
  );
};
  
export default ShopCard;