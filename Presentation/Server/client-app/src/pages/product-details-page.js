import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import IconButton from "../components/icon-button";
import LocationIcon from "../svg/location-icon";
import ShopIcon from "../svg/shop-icon";
import NextIcon from '../svg/next-icon';
import PreviousButton  from '../svg/previous-icon';
import RadioIconButton from "../components/radio-icon-button";
import ImageSlideshow from "../components/image-slideshow";

const ContentContainer = styled.article`
  font-family: 'Open Sans';

  overflow: hidden;

  background-color: ${props => props.theme.whitespace};

  color: black;

  .product-price {
    color: gray;
  }
`;

const ProductDetailsPage = () => {
  const [images, setImages] = useState([
    '/dummy-images/vegetables.jpg', 
    '/dummy-images/fruits.jpg',
    '/dummy-images/meat.jpg',
    '/dummy-images/fruits.jpg', 
    '/dummy-images/vegetables.jpg'
  ]);

  return (
    <Container className='p-0'>
      <ImageSlideshow images={images} />
      <ContentContainer className='w-100 d-flex flex-column'>
        <div className='px-2 pt-2'>
          <IconButton text='Toko' className='align-self-start'>
            <ShopIcon style={{width: '1.6rem', height: '1.6rem'}} />
          </IconButton>
          <IconButton text='Lokasi' className='align-self-start ml-2'>
            <LocationIcon style={{width: '1.6rem', height: '1.6rem'}} />
          </IconButton>
        </div>
        <div className='p-2'>
          <h1 className='m-0'>Lorem Ipsum Dolor Sit Amet Consectetur</h1>
          <p className='m-0 product-price'>Rp 12.345</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mauris velit, imperdiet eu porta in, mattis a nibh. Nam id nunc eget sapien cursus sollicitudin. Vestibulum massa lectus, consectetur ac viverra et, venenatis at risus. Proin consectetur justo ligula, id bibendum purus iaculis nec. Nulla ullamcorper faucibus nisi, eget iaculis ligula gravida in. Nullam pretium massa quis metus varius, eget vestibulum metus rhoncus. Mauris diam orci, tristique et tellus in, iaculis ullamcorper eros. Etiam scelerisque cursus lacinia. Pellentesque rutrum magna a nisi pulvinar, in hendrerit dui condimentum.
          </p>
        </div>
      </ContentContainer>
    </Container>
  );
};

export default ProductDetailsPage;