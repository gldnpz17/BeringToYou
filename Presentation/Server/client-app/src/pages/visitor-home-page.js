import { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import MarketMap from "../components/market-map";
import websiteConfiguration from "../config";
import fetchAllMapFloors from "../use-cases/common/fetch-all-map-floors";
import fetchAllMapOverlays from "../use-cases/common/fetch-all-map-overlays";
import fetchAllPointsOfInterest from "../use-cases/common/fetch-all-points-of-interest";
import fetchAllShops from "../use-cases/common/fetch-all-shops";
import fetchShopDetails from "../use-cases/common/fetch-shop-details";
import ShopOffCanvas from "./visitor-page-components/shop-offcanvas";

const MapContainer = styled.div`
  height: 100%;
`;

const StyledShopOffcanvas = styled(ShopOffCanvas)`
  z-index: 120 !important;
`;

const VisitorHomePage = ({ history }) => {
  const [floors, setFloors] = useState([]);
  const [overlays, setOverlays] = useState([]);
  const [shops, setShops] = useState([]);
  const [pointsOfInterest, setPointsOfInterest] = useState([]);
  const [mapFocus, setMapFocus] = useState(null);

  const [shopOffcanvasShow, setShopOffcanvasShow] = useState(false);
  const [shopToShow, setShopToShow] = useState(null);

  const viewShop = async (shopId) => {
    if (shopId) {
      setShopToShow(await fetchShopDetails(shopId));
      setShopOffcanvasShow(true);
    } else {
      setShopToShow(null);
      setShopOffcanvasShow(false);
    }
  };

  const focusToShop = async () => {
    let params = new URLSearchParams(window.location.search);

    let shopFocusId = params.get('shopfocus');
    if (shopFocusId) {
      let shopDetails = await fetchShopDetails(shopFocusId);

      setMapFocus({
        zoom: 22,
        floor: shopDetails.floor,
        latitude: shopDetails.latitude,
        longitude: shopDetails.longitude
      });
    }
  };

  const clearMapFocus = () => {
    let params = new URLSearchParams(window.location.search);

    let shopFocusId = params.get('shopfocus');
    if (shopFocusId) {
      params.delete('shopfocus');

      history.push('/?' + params.toString());
    }
  };

  useEffect(() => {
    getMapData();
    focusToShop();

    let unlisten = history.listen(async () => {
      focusToShop();
    })

    return function cleanup() {
      unlisten();
    }
  }, []);

  const getMapData = async () => {
    setFloors(await fetchAllMapFloors());
    setOverlays(await fetchAllMapOverlays());
    setShops(await fetchAllShops());
    setPointsOfInterest(await fetchAllPointsOfInterest());
  };

  return (
    <MapContainer>
      <StyledShopOffcanvas
        shop={shopToShow}
        showBackground={false}
        visible={shopOffcanvasShow}
        setVisible={setShopOffcanvasShow}
      />
      <MarketMap
        focus={mapFocus}
        shops={shops}
        pointsOfInterest={pointsOfInterest}
        floors={floors}
        overlays={overlays}
        onShopMarkerClick={(e) => viewShop(e.shopId)}
        onPointOfInterestMarkerClick={() => { }}
        onMoveEnd={clearMapFocus}
        gpsEnabled={true}
        accessToken={websiteConfiguration.mapAccessToken}
        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
      />
    </MapContainer>
  );
};

export default withRouter(VisitorHomePage);