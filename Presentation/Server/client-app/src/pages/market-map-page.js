import { Container } from "react-bootstrap";
import L from 'leaflet';
import { useEffect, useState } from "react";
import styled from "styled-components";
import MapShopIcon from '../helpers/map-shop-icon';
import CloseIcon from "../svg/close-icon";
import SilverwareIcon from '../svg/silverware-icon';
import MapShopOverviewOverlay from "../overlays/map-shop-overview-overlay";
import IconButton from "../components/icon-button";
import ZoomInIcon from '../svg/zoom-in-icon';
import ZoomOutIcon from '../svg/zoom-out-icon';
import LayersIcon from "../svg/layers-icon";
import CustomButton from "../components/custom-button";
import MoreIcon from '../svg/more-icon';
import GpsCrosshairIcon from '../svg/gps-crosshair-icon';

const AccessToken = 'pk.eyJ1IjoienBuZGxnIiwiYSI6ImNranZpODAxcDAybG8yd3FxdG5qYzRjZ24ifQ.IkBSPQC7BeJNpKIISvPmEg';
const MaxZoom = 30;

const PageContainer = styled.div`
  position: absolute;
  overflow: hidden;
  z-index: 0;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  #zoom-control {
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    z-index: 1000;
  }

  #compass-layers-control {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    z-index: 1000;

    p {
      width: 1.6rem;
      height: 1.6rem;
      font-weight: bold;
      margin: 0;
    }
  }

  #misc-controls {
    position: absolute;
    bottom: 0.5rem;
    left: 0.5rem;
    z-index: 1000;
  }

  #gps-controls {
    position: absolute;
    bottom: 0.5rem;
    right: 0.5rem;
    z-index: 1000;
  }
`;

const MapContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  .shop-map-icon {
    padding: 0.2rem;
    transform: translateX(-50%);
    width: 2rem;
    height: 2rem;
    color: white;
    background-color: ${props => props.theme.mapSecondaryLight};

    border-style: solid;
    border-width: 0.1rem;
    border-radius: 1rem;
    border-color: ${props => props.theme.mapSecondary};

    transition-duration: 0.2s;

    :hover {
      background-color: ${props => props.theme.mapSecondary};
      border-color: ${props => props.theme.mapSecondaryDark};
    }

    :active {
      background-color: ${props => props.theme.mapSecondary};
      border-color: ${props => props.theme.mapSecondaryDark};

      transform: translateX(-50%) translateY(0.2rem);
    }

    :focus {
      border-color: ${props => props.theme.mapSecondaryDark};
      box-shadow: ${props => props.theme.shadow} 0rem 0.15rem 0.3rem;
      color: black;
    }
  }

  .shop-map-label {
    width: 5rem;
    text-align: center;
    transform: translateX(-50%);
  }
`;

const CompassButton = styled(CustomButton)`
  height: 3rem;
  width: 3rem;

  border-color: ${props => props.theme.secondaryLight};
  background-color: ${props => props.theme.secondaryLight};

  &.disabled {
    border-color: whitesmoke;
    background-color: whitesmoke;
  }

  :hover {
    border-color: ${props => props.theme.secondaryLight};
    background-color: ${props => props.theme.secondaryLight};

    &.disabled {
      border-color: whitesmoke;
      background-color: whitesmoke;
    }

    filter: brightness(90%);
  }

  :active {
    border-color: ${props => props.theme.secondaryLight};
    background-color: ${props => props.theme.secondaryLight};
    transform: translateY(0.1rem);

    &.disabled {
      border-color: whitesmoke;
      background-color: whitesmoke;
    }

    filter: brightness(80%);
  }

  :focus {
    border-color: ${props => props.theme.secondaryLight};
    background-color: ${props => props.theme.secondaryLight};

    &.disabled {
      border-color: whitesmoke;
      background-color: whitesmoke;
    }

    filter: brightness(80%);
  }
`;

const CompassNeedle = styled.div`
  position: relative;
  width: calc(2.5rem / 3);

  svg {
    height: 2.5rem;
    
    filter: drop-shadow(0.05rem 0.05rem 0.1rem rgba(0, 0, 0, 50%));
  }
`;

const ShopData = [
  {
    latitude: 0,
    longitude: 0,
    shopName: 'Toko Lorem Ipsum',
    category: 'food',
  }
]

const MarketMapPage = () => {
  const [map, setMap] = useState(null); 
  const [shopOverviewVisible, setShopOverviewVisible] = useState(false);

  useEffect(() => {
    // Initialize map.
    let tiles = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token='+ AccessToken, {
      tileSize: 512,
      zoomOffset: -1,
      maxZoom: 30
    })

    if (map === null) {
      let currentMap = L.map('market-map', {
        zoomControl: false,
        attributionControl: false
      }).addLayer(tiles).setView([-7.7987943, 110.3652543], 18).on('click', () => dismissShopOverviewOverlay());
      
      L.marker([-7.7987943, 110.3652543], {
        icon: new MapShopIcon(
          'shop-map-marker', 
          'shop-map-label', 
          <SilverwareIcon className='shop-map-icon' />, 
          'Warung Lorem Ipsum'),
          bubblingMouseEvents: false
      }).addTo(currentMap).on('click', (event) => {
        openShopOverviewOverlay();
      });
      
      setMap(currentMap);
    }

    // Initialize compass.
    initalizeCompass();
  }, []);

  const initalizeCompass = async () => {
    let isIOS = !(
      navigator.userAgent.match(/(iPod|iPhone|iPad)/) &&
      navigator.userAgent.match(/AppleWebKit/)
    );

    if (isIOS) {
      try {
        let response = await DeviceOrientationEvent.requestPermission();
      
        if (response === 'granted') {
          window.addEventListener(
            'deviceorientation', 
            (event) => changeCompassAngle(event.webkitCompassHeading || Math.abs(event.alpha - 360)),
            true
          );
        }
      } catch(error) {
        document.getElementById('compass-button').classList.add('disabled');
      }
    } else {
      window.addEventListener(
        'deviceorientationabsolute',
        (event) => changeCompassAngle(event.webkitCompassHeading || Math.abs(event.alpha - 360)),
        true
      );
    }
  };

  const changeCompassAngle = (degrees) => {
    let compassNeedle = document.getElementById('compass-needle');

    compassNeedle.style.transform = `rotate(${-degrees}deg)`;
  }

  const zoomIn = () => {
    map.zoomIn();
  };

  const zoomOut = () => {
    map.zoomOut();
  };

  const openShopOverviewOverlay = () => {
    setShopOverviewVisible(true);
  };

  const dismissShopOverviewOverlay = () => {
    setShopOverviewVisible(false);
  };

  return (
    <PageContainer className='m-0'>
      <span id='zoom-control' className='d-flex flex-column'>
        <IconButton iconOnly={true} className='p-1 m-1'
          onClick = {() => zoomIn()}  
        >
          <ZoomInIcon style={{width: '1.6rem', height: '1.6rem'}} />
        </IconButton>
        <IconButton iconOnly={true} className='p-1 m-1'
          onClick = {() => zoomOut()}
        >
          <ZoomOutIcon style={{width: '1.6rem', height: '1.6rem'}} />
        </IconButton>
      </span>
      <span id='compass-layers-control' className='d-flex flex-column align-items-end'>
        <CompassButton id='compass-button' className='p-1 m-1 d-flex align-items-center justify-content-center'>
          <CompassNeedle id='compass-needle'>
            <svg viewBox='0 0 50 300'>
              <polygon id='north-half' fill='red' points='0,150 25,0 50,150' />
              <polygon id='south-half' fill='gray' points='0,150 25,300 50,150' />
              <rect id='needle-center' fill='black' x='0'rx='10' ry='10' y='125' width='50' height='50' />
            </svg>
          </CompassNeedle>
        </CompassButton>
        <CustomButton className='p-1 m-1'>
          <p>lt.1</p>
        </CustomButton>
        <IconButton iconOnly={true} className='p-1 m-1'>
          <LayersIcon style={{width: '1.6rem', height: '1.6rem'}} />
        </IconButton>
      </span>
      <span id='misc-controls'>
        <IconButton iconOnly={true} className='p-1 m-1'>
          <MoreIcon style={{width: '1.6rem', height: '1.6rem'}} />
        </IconButton>
      </span>
      <span id='gps-controls'>
        <IconButton iconOnly={true} className='p-1 m-1'>
          <GpsCrosshairIcon style={{width: '1.6rem', height: '1.6rem'}} />
        </IconButton>
      </span>
      <MapContainer id='market-map' />
      <MapShopOverviewOverlay visible={shopOverviewVisible} />
    </PageContainer>
  );
};

export default MarketMapPage;