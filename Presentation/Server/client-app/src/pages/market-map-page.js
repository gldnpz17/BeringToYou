import { Container } from "react-bootstrap";
import L from 'leaflet';
import { useEffect, useState } from "react";
import styled from "styled-components";
import MarketMap from "../components/market-map";
import MapShopOverviewOverlay from "../overlays/map-shop-overview-overlay";
import websiteConfiguration from "../config";

const PageContainer = styled.div`
  position: absolute;
  overflow: hidden;
  z-index: 0;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

const MarketMapPage = () => {
   
  const [shopOverviewVisible, setShopOverviewVisible] = useState(false);

  const openShopOverviewOverlay = () => {
    setShopOverviewVisible(true);
  };

  const dismissShopOverviewOverlay = () => {
    setShopOverviewVisible(false);
  };

  return (
    <PageContainer className='m-0'>
      <MarketMap
        className='w-100 h-100'
        accessToken={websiteConfiguration.mapAccessToken}
        onMapClick={() => dismissShopOverviewOverlay()}
        onMarkerClick={() => openShopOverviewOverlay()}
      />
      <MapShopOverviewOverlay visible={shopOverviewVisible} />
    </PageContainer>
  );
};

export default MarketMapPage;