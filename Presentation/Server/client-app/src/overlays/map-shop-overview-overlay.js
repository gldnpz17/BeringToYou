import { useState } from "react";
import styled from "styled-components";
import NavigateToLink from "../components/navigate-to-link";
import ChevronUpIcon from '../svg/chevron-up-icon';

const Container = styled.div`
  position: absolute;
  bottom: 0.5rem;
  left: 1rem;
  right: 1rem;
  z-index: 1000;
  border-radius: 0.5rem;

  transition-timing-function: ease-in-out;
  transition-duration: 0.5s;

  box-shadow: ${props => props.theme.shadow} 0rem 0.15rem 0.3rem;

  background-color: ${props => props.theme.whitespace};

  h1 {
    font-family: 'Open Sans';
    font-weight: bold;
    font-size: 1.2rem;
  }

  .shop-description {
    font-family: 'Open Sans';
    position: relative;
    line-height: 1em;
    height: 3em;
    overflow: hidden;

    transition-duration: 0.4s;

    &.hidden {
      height: 0;
      opacity: 0;
    }

    &:after {
      content: "";
      text-align: right;
      position: absolute;
      bottom: 0;
      right: 0;
      width: 50%;
      height: 1em;
      background: linear-gradient(to right, rgba(245, 245, 245, 0), rgba(245, 245, 245, 1) 50%);
    }
  }
`;

const ExpandButton = styled.span`
  width: 3rem;
  height: 1.2rem;
  overflow: hidden;

  transition-duration: 0.4s;

  color: ${props => props.theme.lightButton};

  :hover {
    color: ${props => props.theme.lightButtonDarkened};
  }

  :active {
    color: ${props => props.theme.secondary};
  }

  .expand-icon {
    width: 4rem;
    height: 2rem;
  }
`;

const MapShopOverviewOverlay = (props) => {
  const [displayMode, setDisplayMode] = useState('brief');

  const toggleDisplayMode = () => {
    if (displayMode === 'brief') {
      setDisplayMode('detailed');

      document.getElementById('map-shop-overlay-description').classList.remove('hidden');
      document.getElementById('map-overlay-expand').style.transform = 'scaleY(-1)';
    } else {
      setDisplayMode('brief');

      document.getElementById('map-shop-overlay-description').classList.add('hidden');
      document.getElementById('map-overlay-expand').style.transform = 'scaleY(1)';
    }
  };

  return (
    <Container className='px-3 pt-1 pb-3 d-flex flex-column' style={{
      transform: props.visible ? 'translateY(0px)' : 'translateY(10rem)'
    }}>
      <ExpandButton id='map-overlay-expand' className='d-flex align-items-center justify-content-center m-auto'
        onClick={() => toggleDisplayMode()}
      >
        <ChevronUpIcon className='expand-icon' preserveAspectRatio='none' />
      </ExpandButton>
      <h1 className='m-0'>Warung Lorem Ipsum</h1>
      <p id='map-shop-overlay-description' className='m-0 shop-description hidden'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mauris velit, imperdiet eu porta in, mattis a nibh. Nam id nunc eget sapien cursus sollicitudin. Vestibulum massa lectus, consectetur ac viverra et, venenatis at risus. Proin consectetur justo ligula, id bibendum purus iaculis nec. Nulla ullamcorper faucibus nisi, eget iaculis ligula gravida in. Nullam pretium massa quis metus varius, eget vestibulum metus rhoncus. Mauris diam orci, tristique et tellus in, iaculis ullamcorper eros. Etiam scelerisque cursus lacinia. Pellentesque rutrum magna a nisi pulvinar, in hendrerit dui condimentum.
      </p>
      <div className='align-self-end'>
        <NavigateToLink text={'Lihat Toko'} />
      </div>
    </Container>
  );
};

export default MapShopOverviewOverlay;