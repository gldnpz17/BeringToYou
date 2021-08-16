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
import L, { marker } from 'leaflet';
import '../lib/L.KML';
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import fetchAllShops from "../use-cases/common/fetch-all-shops";
import FailSafeImg from '../components/fail-safe-img';
import RadioIconButton from "./radio-icon-button";
import delay from "../helpers/delay";
import GenericMapIcon from "../helpers/generic-map-icon";
import sortByObjectProperty from "../helpers/sort-by-object-property";
import MapLegendIcon from '../svg/map-legend-icon';
import CopyrightIcon from '../svg/copyright-icon';
import MapLegendModal from "../modals/market-map/map-legend-modal";
import AttributionsModal from '../modals/market-map/attributions-modal';

const StyledMap = styled.div`
  #zoom-control {
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    z-index: 100;
  }

  #compass-layers-control {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    z-index: 100;

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
    z-index: 100;
  }

  #gps-controls {
    position: absolute;
    bottom: 0.5rem;
    right: 0.5rem;
    z-index: 100;
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
  z-index: 0;
  width: 100%;
  height: 100%;

  .shop-map-icon, .point-of-interest-map-icon {
    padding: 0.2rem;
    transform: translateX(-50%);
    width: 2rem;
    height: 2rem;
    color: white;

    border-style: solid;
    border-width: 0.1rem;
    border-radius: 1rem;

    transition-duration: 0.2s;

    :focus {
      box-shadow: ${props => props.theme.shadow} 0rem 0.15rem 0.3rem;
      color: black;
    }
  }

  .shop-map-icon {
    background-color: ${props => props.theme.mapSecondaryLight};
    border-color: ${props => props.theme.mapSecondary};

    :hover, :active {
      background-color: ${props => props.theme.mapSecondary};
    }

    :hover, :active, :focus {
      border-color: ${props => props.theme.mapSecondaryDark};
    }

    :active {
      transform: translateX(-50%) translateY(0.2rem);
    }
  } 
  
  .point-of-interest-map-icon {
    background-color: ${props => props.theme.mapPrimaryLight};
    border-color: ${props => props.theme.mapPrimary};

    :hover, :active {
      background-color: ${props => props.theme.mapPrimary};
    }

    :hover, :active, :focus {
      border-color: ${props => props.theme.mapPrimaryDark};
    }
  }

  .map-label {
    width: 5rem;
    text-align: center;
    transform: translateX(-50%);
  }

  .gps-marker {
    padding: 0.2rem;
    transform: translateX(-50%);
    width: 1.6rem !important;
    height: 1.6rem !important;
    background-color: ${props => props.theme.primaryLight};

    border-style: solid;
    border-width: 0.15rem;
    box-shadow: ${props => props.theme.shadow} 0.1rem 0.1rem 0.2rem;
    border-radius: 1rem;
    border-color: ${props => props.theme.primary};
  }
`;

const ExpandableContainer = styled.span`
  
`;

const ExpandableContents = styled.div`
  transition-duration: 0.5s;

  &.hidden {
    opacity: 0%;
  }
`;

const MarketMap = ({
  shops, 
  pointsOfInterest, 
  floors, 
  overlays, 
  onShopMarkerClick, 
  onPointOfInterestMarkerClick,
  onMoveEnd,
  gpsEnabled,
  focus, ...props}) => {
  
  const [map, setMap] = useState(null);
  const [tileLayer, setTileLayer] = useState(null);
  const [currentFloorNumber, setCurrentFloorNumber] = useState(1);

  const [floorSelectOpen, setFloorSelectOpen] = useState(false);
  const [miscExpandOpen, setMiscExpandOpen] = useState(false);

  const [showLegendModal, setShowLegendModal] = useState(false);
  const [showAttributionsModal, setShowAttributionsModal] = useState(false);

  const [gpsMarker, setGpsMarker] = useState(null);
  const [gpsLatLong, setGpsLatLong] = useState(null);

  useEffect(() => {
    // Initialize map.
    if (map === null) {
      let currentMap = L.map('market-map', {
        zoomControl: false,
        attributionControl: false
      });

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

      currentMap.on('move', onMoveEnd ? onMoveEnd : () => {});

      setMap(currentMap);

      initializeGps(currentMap);
    }

    initalizeCompass();
  }, []);

  useEffect(() => {
    if (focus) {
      setCurrentFloorNumber(focus.floor);
      map.flyTo([focus.latitude, focus.longitude], focus.zoom);
    }
  }, [focus])

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

  const initializeGps = (gpsMap) => {
    if (!gpsMarker) {
      let gpsIsAvailable = 'geolocation' in navigator;
    
      if (gpsEnabled && gpsIsAvailable) {
        console.log('GPS available.')

        let marker = L.marker([0, 0], {
          icon: new GenericMapIcon(
            'gps-marker', 
            '', 
            <div />,
            '')
        });
        setGpsMarker(marker);
        marker.addTo(gpsMap);
  
        navigator.geolocation.watchPosition((position) => {
          let coords = position.coords;
  
          setGpsLatLong([coords.latitude, coords.longitude]);
        });
      } else {
        console.log('GPS unavailable.');
      }
    }
  };

  useEffect(() => {
    renderGpsMarker();
  }, [gpsMarker, gpsLatLong])

  const renderGpsMarker = () => {
    if (gpsMarker && gpsLatLong) {
      gpsMarker.setLatLng(gpsLatLong);
    }
  };

  const focusOnGpsMarker = () => {
    map.flyTo(gpsLatLong, 21);
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
    renderMap();
  }, [shops, pointsOfInterest, overlays, floors, currentFloorNumber]);

  const generateSubcategoryGradientBackground = (subcategories) => {
    if (!subcategories) {
      return null;
    }

    let sortedSubcategories = sortByObjectProperty(subcategories, 'name');

    let fractionAngle = 360 / sortedSubcategories.length;

    let fractionColors = [];

    sortedSubcategories.forEach((subcategory, index) => {
      let angleStart = index * fractionAngle;
      fractionColors.push([
        subcategory.rgbHexLegendColor, 
        `${angleStart}deg`, 
        `${angleStart + fractionAngle}deg`].join(' ')
      );
    });

    return fractionColors.join(', ');
  }

  const renderMap = async () => {
    if (map !== null) {
      // Remove old layers.
      map.eachLayer(layer => {
        if (layer !== tileLayer && layer !== gpsMarker) {
          map.removeLayer(layer);
        }
      });

      // Render tiles.
      if (tileLayer === null) {
        let tiles = L.tileLayer('https://api.mapbox.com/styles/v1/zpndlg/ckr7oxark0lbn17mtzv4dym5u/tiles/{z}/{x}/{y}?access_token='+ props.accessToken, {
          attribution: '© <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          tileSize: 512,
          zoomOffset: -1,
          maxZoom: 23
        });
        map.addLayer(tiles);

        setTileLayer(tiles);
      }

      // Render floor layers.
      let selectedFloor = floors.find(floor => floor.floorNumber === currentFloorNumber);

      if (selectedFloor) {
        let response = await fetch(`/api/public/assets/${selectedFloor.kmlFilename}`);

        if (response.status === 200) {
          let kmlText = await response.text();

          const parser = new DOMParser();
          const kml = parser.parseFromString(kmlText, 'text/xml');
          const layerToRender = new L.KML(kml);
          map.addLayer(layerToRender);
        }
      };

      // Render markers.
      shops?.forEach(shop => {
        if (shop.floor === currentFloorNumber) {
          L.marker([shop.latitude, shop.longitude], {
            icon: new MapShopIcon(
              'map-marker', 
              'map-label', 
              <FailSafeImg 
                style={{
                  background: `conic-gradient(${generateSubcategoryGradientBackground(shop.subcategories)})`
                }}
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
          });
        }
      });
  
      pointsOfInterest.forEach(pointOfInterest => {
        if (pointOfInterest.floorNumber == currentFloorNumber) {
          L.marker([pointOfInterest.latitude, pointOfInterest.longitude], {
            icon: new GenericMapIcon(
              'map-marker', 
              'map-label', 
              <FailSafeImg 
                src={`/api/public/assets/${pointOfInterest.category.iconFilename}`}
                altsrc='/map-assets/missing-marker-icon.svg'
                className='point-of-interest-map-icon' 
              />, 
              pointOfInterest.category.name),
              bubblingMouseEvents: false
          }).addTo(map).on('click', (event) => {
            if (props.onMarkerClick !== null && onPointOfInterestMarkerClick !== undefined) {
              event.pointOfInterestId = pointOfInterest.id;
              onPointOfInterestMarkerClick(event);
            }
          });
        }
      });
    };
  };

  return (
    <StyledMap {...props}>
      <MapLegendModal 
        show={showLegendModal}
        setShow={setShowLegendModal}
      />
      <AttributionsModal 
        show={showAttributionsModal}
        setShow={setShowAttributionsModal}
      />
      <span id='zoom-control' className='d-flex flex-column'>
        <IconButton iconOnly className='p-1 m-1'
          onClick = {() => zoomIn()}  
        >
          <ZoomInIcon style={{width: '1.6rem', height: '1.6rem'}} />
        </IconButton>
        <IconButton iconOnly className='p-1 m-1'
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
        <ExpandableContainer className='d-flex flex-row'>
          <ExpandableContents className={`d-flex flex-row align-items-center ${floorSelectOpen ? '' : 'hidden'}`}>
            {floors.map(floor => {
              return (
                <RadioIconButton 
                  id={`floor-button-${floor.floorNumber}`} 
                  selectedId={`floor-button-${currentFloorNumber}`}
                  iconOnly={true} className='p-1 m-1' 
                  onClick={() => setCurrentFloorNumber(floor.floorNumber)}>
                  <p>{floor.floorNumber}</p>
                </RadioIconButton>
              ); 
            })}
          </ExpandableContents>
          {(floorSelectOpen)
            ? <IconButton iconOnly className='p-1 m-1' onClick={() => setFloorSelectOpen(false)}>
                <CloseIcon style={{height: '1.6rem !important'}} />
              </IconButton> 
            : <CustomButton className='p-1 m-1' onClick={() => setFloorSelectOpen(true)}>
                <p style={{width: '1.6rem', height: '1.6rem'}}>lt.{currentFloorNumber}</p>
              </CustomButton>}
        </ExpandableContainer>
        <IconButton iconOnly aria-disabled='true' className='p-1 m-1'>
          <LayersIcon style={{width: '1.6rem', height: '1.6rem'}} />
        </IconButton>
      </span>
      <span id='misc-controls'>
        <ExpandableContainer className='d-flex flex-column'>
          <ExpandableContents className={`d-flex flex-column align-items-center ${miscExpandOpen ? '' : 'hidden'}`}>
            <IconButton iconOnly className='p-1 m-1' onClick={() => setShowLegendModal(true)}>
              <MapLegendIcon style={{width: '1.6rem', height: '1.6rem'}} />
            </IconButton>
            <IconButton iconOnly className='p-1 m-1' onClick={() => setShowAttributionsModal(true)}>
              <CopyrightIcon style={{width: '1.6rem', height: '1.6rem'}} />
            </IconButton>
          </ExpandableContents>
          {(miscExpandOpen) 
            ? <IconButton iconOnly className='p-1 m-1' onClick={() => setMiscExpandOpen(false)}>
                <CloseIcon style={{height: '1.6rem !important'}} />
              </IconButton>
            : <IconButton iconOnly className='p-1 m-1' onClick={() => setMiscExpandOpen(true)}>
                <MoreIcon style={{width: '1.6rem', height: '1.6rem'}} />
              </IconButton>}
        </ExpandableContainer>
      </span>
      <span id='gps-controls'>
        <IconButton iconOnly={true} 
          aria-disabled={gpsMarker && gpsLatLong ? 'false' : 'true'} 
          className='p-1 m-1'
          onClick={focusOnGpsMarker}>
          <GpsCrosshairIcon style={{width: '1.6rem', height: '1.6rem'}} />
        </IconButton>
      </span>
      <MapContainer id='market-map' />
    </StyledMap>
  );
};

export default MarketMap;