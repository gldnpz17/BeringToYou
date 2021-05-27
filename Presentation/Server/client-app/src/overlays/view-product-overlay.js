import { Container } from "react-bootstrap";
import styled from "styled-components";
import IconButton from "../components/icon-button";
import CloseIcon from '../svg/close-icon';
import LocationIcon from "../svg/location-icon";

const OverlayContainer = styled.div`
  height: 100%;
  width: 100%;
  z-index: 2000;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;

  background-color: rgba(0, 0, 0, 0.85);
  overflow: scroll;

  opacity: 1.0;
  visibility: hidden;
  
  transition: 0.3s;

  color: whitesmoke;
`;

const OverlayBackground = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  z-index: 2001;
`;

const ContentContainer = styled.article`
  font-family: 'Open Sans';
  z-index: 2002;
  position: relative;

  border-radius: 1rem;
  overflow: hidden;

  background-color: ${props => props.theme.whitespace};

  color: black;

  .product-price {
    color: gray;
  }
`;

const CloseOverlayButton = styled(CloseIcon)`
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  width: 2rem;
  height: 2rem;

  color: ${props => props.theme.secondary}
`;

const ViewProductOverlay = ({ id, productId }) => {
  const dismissViewProductOverlay = () => {
    document.getElementById(id).style.opacity = 0;
    document.getElementById(id).style.visibility = 'hidden';
  }

  return (
    <OverlayContainer id={id}>
      <OverlayBackground onClick={() => dismissViewProductOverlay()} />
      <Container style={{height: 'auto', overflow: 'auto', minHeight: '100%'}} className='d-flex flex-column'>
        <div className='flex-grow-1 p-3'></div>
        <ContentContainer className='w-100 d-flex flex-column'>
          <CloseOverlayButton onClick={() => dismissViewProductOverlay()} />
          <img className='flex-grow-1' src='/dummy-images/vegetables.jpg' style={{objectFit: 'cover', maxHeight: '50vh'}} />
          <IconButton text='Lokasi' className='align-self-start ms-2 mt-2'>
            <LocationIcon style={{width: '1.6rem', height: '1.6rem'}} />
          </IconButton>
          <div className='p-2'>
            <h1 className='m-0'>Lorem Ipsum Dolor Sit Amet Consectetur</h1>
            <p className='m-0 product-price'>Rp 12.345</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mauris velit, imperdiet eu porta in, mattis a nibh. Nam id nunc eget sapien cursus sollicitudin. Vestibulum massa lectus, consectetur ac viverra et, venenatis at risus. Proin consectetur justo ligula, id bibendum purus iaculis nec. Nulla ullamcorper faucibus nisi, eget iaculis ligula gravida in. Nullam pretium massa quis metus varius, eget vestibulum metus rhoncus. Mauris diam orci, tristique et tellus in, iaculis ullamcorper eros. Etiam scelerisque cursus lacinia. Pellentesque rutrum magna a nisi pulvinar, in hendrerit dui condimentum.
            </p>
          </div>
        </ContentContainer>
        <div className='flex-grow-1 p-3'></div>
      </Container>
    </OverlayContainer>
  );
};

export default ViewProductOverlay;