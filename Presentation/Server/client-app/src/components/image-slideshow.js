import { useEffect, useState } from "react";
import styled from "styled-components";
import NextIcon from "../svg/next-icon";
import PreviousIcon from "../svg/previous-icon";

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
  height: ${props => props.height ?? '50vh'};
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

  user-select: none;
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

const PreviousImageButton = styled(PreviousIcon)`
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

const ImageSlideshow = (props) => {
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
  };

  const nextImage = () => {
    if (currentImageIndex >= (props.images.length - 1)) {
      selectImage(0);
    } else {
      selectImage(currentImageIndex + 1);
    }
  };

  const previousImage = () => {
    if (currentImageIndex <= 0) {
      selectImage(props.images.length - 1);
    } else {
      selectImage(currentImageIndex - 1);
    }
  };

  return (
    <>
      <SelectedSlideshowImageContainer height={props.height}>
        <SelectedSlideshowImageBackground src={props.images[currentImageIndex]} />
        <SelectedSlideshowImage id='product-slideshow-current'
          src={props.images[currentImageIndex]}
        />
        <NextImageButton onClick={() => nextImage()} />
        <PreviousImageButton onClick={() => previousImage()} />
      </SelectedSlideshowImageContainer>
      <SlideshowImagesContainer className='d-flex flex-row py-1'>
        {
          props.images.map((image, index) => {
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
    </>
  );
};

export default ImageSlideshow;