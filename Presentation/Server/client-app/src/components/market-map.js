import styled from "styled-components";
import MapShopIcon from '../helpers/map-shop-icon';
import CloseIcon from "../svg/close-icon";
import SilverwareIcon from '../svg/silverware-icon';
import IconButton from "../components/icon-button";
import ZoomInIcon from '../svg/zoom-in-icon';
import ZoomOutIcon from '../svg/zoom-out-icon';
import LayersIcon from "../svg/layers-icon";
import CustomButton from "../components/custom-button";
import MoreIcon from '../svg/more-icon';
import GpsCrosshairIcon from '../svg/gps-crosshair-icon';
import L from 'leaflet';
import '../lib/L.KML';
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import fetchAllShops from "../use-cases/common/fetch-all-shops";
import FailSafeImg from '../components/fail-safe-img';

const StyledMap = styled.div`
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

const MapContainer = styled.div`
  width: 100%;
  height: 100%;

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

const MarketMap = ({
  shops, 
  pointsOfInterest, 
  floors, 
  overlays, 
  onShopMarkerClick, 
  onPointOfInterestMarkerClick, ...props}) => {
  const [map, setMap] = useState(null);
  const [currentFloor, setCurrentFloor] = useState(1);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    // Initialize map.
    let tiles = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token='+ props.accessToken, {
      attribution: '© <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      tileSize: 512,
      zoomOffset: -1,
      maxZoom: 30
    });

    if (map === null) {
      let currentMap = L.map('market-map', {
        zoomControl: false,
        attributionControl: false
      }).addLayer(tiles);

      currentMap.on('load', () => {
        setTimeout(() => {
          currentMap.invalidateSize();
        }, 100);
      });

      currentMap.setView([-7.7987943, 110.3652543], 18);

      currentMap.on('click', () => {
        if (props.onMapClick !== null && props.onMapClick !== undefined) {
          props.onMapClick();
        }
      });
      
      setMap(currentMap);
    }

    // Initialize compass.
    initalizeCompass();
  }, []);

  const initalizeCompass = async () => {
    let isIOS = (
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
            false
          );
        }
      } catch(error) {
        document.getElementById('compass-button').classList.add('disabled');
      }
    } else {
      if (window.DeviceOrientationEvent) {
        window.addEventListener(
          'deviceorientation',
          (event) => changeCompassAngle(Math.abs(event.alpha - 360)),
          false
        );
      } else {
        document.getElementById('compass-button').classList.add('disabled');
      }
    }
  };

  const changeCompassAngle = (degrees) => {
    let compassNeedle = document.getElementById('compass-needle');

    compassNeedle.style.transform = `rotate(${degrees}deg)`;
  }

  const zoomIn = () => {
    map.zoomIn(1);

    map.invalidateSize();
  };

  const zoomOut = () => {
    map.zoomOut(1);

    map.invalidateSize();
  };

  useEffect(() => {
    renderMarkers();
    renderFloors();
  }, [shops, pointsOfInterest, overlays, floors]);

  const renderMarkers = () => {
    // Remove old markers.
    markers.forEach(marker => {
      map.removeLayer(marker);
    });

    // Add new markers.
    let newMarkers = [];

    shops?.forEach(shop => {
      if (shop.floor === currentFloor) {
        newMarkers.push(L.marker([shop.latitude, shop.longitude], {
          icon: new MapShopIcon(
            'shop-map-marker', 
            'shop-map-label', 
            <FailSafeImg 
              src={`/api/public/assets/${shop.category.iconFilename}`}
              altsrc='/map-assets/missing-marker-icon.svg'
              className='shop-map-icon' 
            />, 
            shop.name),
            bubblingMouseEvents: false
        }).addTo(map).on('click', (event) => {
          if (props.onMarkerClick !== null && onShopMarkerClick !== undefined) {
            event.shopId = shop.id;
            onShopMarkerClick(event);
          }
        }));
      }
    });

    pointsOfInterest.forEach(pointOfInterest => {
      if (pointOfInterest.floorNumber == currentFloor) {
        newMarkers.push(L.marker([pointOfInterest.latitude, pointOfInterest.longitude], {
          icon: new MapShopIcon(
            'shop-map-marker', 
            'shop-map-label', 
            <SilverwareIcon className='shop-map-icon' />, 
            pointOfInterest.category.name),
            bubblingMouseEvents: false
        }).addTo(map).on('click', (event) => {
          if (props.onMarkerClick !== null && onPointOfInterestMarkerClick !== undefined) {
            event.pointOfInterestId = pointOfInterest.id;
            onPointOfInterestMarkerClick(event);
          }
        }));
      }
    });

    setMarkers(newMarkers);
  };

  const renderFloors = () => {
    if (map !== null) {
      fetch('/kml/pb.kml')
        .then(res => res.text())
        .then(kmltext => {
            const parser = new DOMParser();
            const kml = parser.parseFromString(kmltext, 'text/xml');
            const track = new L.KML(kml);
            map.addLayer(track);
        }
      );
    }
  }

  return (
    <StyledMap {...props}>
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
    </StyledMap>
  );
};

export default MarketMap;