import { Container } from "react-bootstrap";
import L from 'leaflet';
import { useEffect, useState } from "react";
import styled from "styled-components";

const AccessToken = 'pk.eyJ1IjoienBuZGxnIiwiYSI6ImNranZpODAxcDAybG8yd3FxdG5qYzRjZ24ifQ.IkBSPQC7BeJNpKIISvPmEg';

const PageContainer = styled(Container)`
  position: absolute;
  z-index: 0;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

const MapContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

const MarketMapPage = () => {
  const [map, setMap] = useState(null); 

  useEffect(() => {
    let tiles = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token='+ AccessToken, {
      attribution: '© <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      tileSize: 512,
      zoomOffset: -1,
      maxZoom: 30
    })

    if (map === null) {
      setMap(L.map('market-map').addLayer(tiles).setView([-7.7987943, 110.3652543], 18));
    }
  }, [])

  return (
    <PageContainer fluid className='m-0 mt-5'>
      <MapContainer id='market-map' />
    </PageContainer>
  );
};

export default MarketMapPage;