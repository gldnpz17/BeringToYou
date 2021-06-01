import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import IconButton from "../components/icon-button";
import LocationIcon from "../svg/location-icon";
import ShopIcon from "../svg/shop-icon";
import NextIcon from '../svg/next-icon';
import PreviousButton  from '../svg/previous-icon';
import RadioIconButton from "../components/radio-icon-button";

const ContentContainer = styled.article`
  font-family: 'Open Sans';

  overflow: hidden;

  background-color: ${props => props.theme.whitespace};

  color: black;

  .product-price {
    color: gray;
  }
`;

const SlideshowImagesContainer = styled.div`
  height: 5rem;
  overflow-x: scroll;

  img[aria-selected=true] {
    border-color: ${props => props.theme.secondaryDark};
    filter: brightness(75%);
  }
`;

const SlideshowImage = styled.img`
  object-fit: cover;
  height: 100%;
  border-radius: 0.5rem;
  border-color: ${props => props.theme.secondary};
  border-width: 0.1rem;
  border-style: solid;

  transition-duration: 0.5s;

  min-width: 6rem;
  max-width: 6rem;
`;

const SelectedSlideshowImageContainer = styled.div`
  height: 50vh;
  position: relative;
  overflow: hidden;
`;

const SelectedSlideshowImageBackground = styled.div`
  position: absolute;
  z-index: 0;

  background-image: url(${props => props.src});
  background-size: cover;
  filter: blur(0.1rem) brightness(50%);
  
  left: -10px;
  right: -10px;
  top: -10px;
  bottom: -10px;
`;

const SelectedSlideshowImage = styled.img`
  position: relative;
  z-index: 1;
  object-fit: contain;
  width: 100%;
  height: 100%;
`;

const NextImageButton = styled(NextIcon)`
  position: absolute;
  z-index: 2;
  right: 0.3rem;
  top: 50%;
  transform: translateY(-50%);

  color: whitesmoke;
  opacity: 80%;

  transition-duration: 0.3s;

  height: 2rem;
  width: 2rem;

  :active {
    transform: translateX(0.2rem) translateY(-50%);
    color: ${props => props.theme.secondary};
  }
`;

const PreviousImageButton = styled(PreviousButton)`
  position: absolute;
  z-index: 2;
  left: 0.3rem;
  top: 50%;
  transform: translateY(-50%);

  color: whitesmoke;
  opacity: 80%;

  transition-duration: 0.3s;

  height: 2rem;
  width: 2rem;

  :active {
    transform: translateX(-0.2rem) translateY(-50%);
    color: ${props => props.theme.secondary};
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

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    selectImage(0);
  }, []);

  const selectImage = (index) => {
    let images = document.getElementsByClassName('slideshow-image');
    
    for (let x = 0; x < images.length; x++) {
      if (x === index) {
        images[x].ariaSelected = 'true';
        images[x].parentNode.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
      } else {
        images[x].ariaSelected = 'false'
      }
    }

    setCurrentImageIndex(index);
  }

  const nextImage = () => {
    if (currentImageIndex >= (images.length - 1)) {
      selectImage(0);
    } else {
      selectImage(currentImageIndex + 1);
    }
  }

  const previousImage = () => {
    if (currentImageIndex <= 0) {
      selectImage(images.length - 1);
    } else {
      selectImage(currentImageIndex - 1);
    }
  }

  return (
    <Container className='p-0'>
      <ContentContainer className='w-100 d-flex flex-column'>
        <SelectedSlideshowImageContainer>
          <SelectedSlideshowImageBackground src={images[currentImageIndex]} />
          <SelectedSlideshowImage id='product-slideshow-current'
            src={images[currentImageIndex]} 
          />
          <NextImageButton onClick={() => nextImage()}/>
          <PreviousImageButton onClick={() => previousImage()} />
        </SelectedSlideshowImageContainer>
        <SlideshowImagesContainer className='d-flex flex-row py-1'>
          {
            images.map((image, index) => {
              return (
                <span className='px-1'>
                  <SlideshowImage src={image} className='slideshow-image' 
                    onClick={() => selectImage(index)} 
                  />
                </span>
              );
            })
          }
        </SlideshowImagesContainer>
        <div className='px-2 pt-2'>
          <IconButton text='Toko' className='align-self-start'>
            <ShopIcon style={{width: '1.6rem', height: '1.6rem'}} />
          </IconButton>
          <IconButton text='Lokasi' className='align-self-start ms-2'>
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