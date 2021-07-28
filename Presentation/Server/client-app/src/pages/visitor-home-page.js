import { useEffect, useState } from "react";
import styled from "styled-components";
import MarketMap from "../components/market-map";
import websiteConfiguration from "../config";
import fetchAllMapFloors from "../use-cases/common/fetch-all-map-floors";
import fetchAllMapOverlays from "../use-cases/common/fetch-all-map-overlays";
import fetchAllPointsOfInterest from "../use-cases/common/fetch-all-points-of-interest";
import fetchAllShops from "../use-cases/common/fetch-all-shops";
import ShopOffCanvas from "./visitor-page-components/shop-offcanvas";

const MapContainer = styled.div`
  position: relative;

  height: 100%;
`;

const VisitorHomePage = () => {
  const [floors, setFloors] = useState([]);
  const [overlays, setOverlays] = useState([]);
  const [shops, setShops] = useState([]);
  const [pointsOfInterest, setPointsOfInterest] = useState([]);

  useEffect(() => {
    getMapData();
  }, []);

  const getMapData = async () => {
    setFloors(await fetchAllMapFloors());
    setOverlays(await fetchAllMapOverlays());
    setShops(await fetchAllShops());
    setPointsOfInterest(await fetchAllPointsOfInterest());
  };

  return (
    <MapContainer>
      <ShopOffCanvas />
      <MarketMap
        shops={shops}
        pointsOfInterest={pointsOfInterest}
        floors={floors}
        overlays={overlays}
        onShopMarkerClick={() => {}}
        onPointOfInterestMarkerClick={() => {}}
        accessToken={websiteConfiguration.mapAccessToken}
        style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}}
      />
    </MapContainer>
  );
};

export default VisitorHomePage;