import React, { useEffect } from 'react';
import { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import AdminNavigationBar from './components/admin-navigation-bar';
import AdminSidebar from './components/admin-sidebar';
import NavigationBar from "./components/navigation-bar";
import NavigationOverlay from "./overlays/navigation-overlay";
import ViewProductOverlay from './overlays/view-product-overlay';
import AdminWelcomePage from './pages/admin-welcome-page';
import HomePage from "./pages/home-page";
import MarketMapPage from './pages/market-map-page';
import ProductDetailsPage from './pages/product-details-page';
import ProductSearchPage from "./pages/product-search-page";
import ShopListPage from "./pages/shop-list-page";
import ShopProfilePage from "./pages/shop-profile-page";

const AdminPageContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const App = () => {
  const theme = {
    primary: '#427F66',
    primaryLight: '#70AF94',
    primaryDark: '#11523C',
    secondary: '#C5D784',
    secondaryLight: '#F9FFB5',
    secondaryLightTransparent: 'rgba(249, 255, 181, 0.5)',
    secondaryDark: '#93A656',
    whitespace: '#F5F5F5',
    shadow: 'rgba(0, 0, 0, 0.5)',
    semiTransparentWhite : 'rgba(255, 255, 255, 0.75)',
    mapPrimary: '#E65100',
    mapPrimaryLight: '#FF833A',
    mapPrimaryDark: '#AC1900',
    mapSecondary: '#1976D2',
    mapSecondaryLight: '#63A4ff',
    mapSecondaryDark: '#004BA0',
    lightButton: '#CFD8DC',
    lightButtonDarkened: '#B0BEC5'
  }

  const resizePageContent = () => {
    let navigationBarHeight = document.getElementById('navigation-bar').clientHeight;
    let viewportHeight = document.documentElement.clientHeight;

    let navigationBarElement = document.getElementById('navigation-bar');
    navigationBarElement.style.maxHeight = `${navigationBarHeight}px`;

    let pageContentElement = document.getElementById('page-content');
    pageContentElement.style.marginTop = `${navigationBarHeight - 1}px`;
    pageContentElement.style.minHeight = `${viewportHeight - navigationBarHeight}px`;
  };

  useEffect(() => {
    resizePageContent();
    window.onresize = () => resizePageContent();
  }, []);

  const [displayMode, setDisplayMode] = useState('list');

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route path='/admin'>
            <AdminNavigationBar id='navigation-bar' />
          </Route>
          <Route path='/'>
            <NavigationBar id='navigation-bar' />
          </Route>
        </Switch>
        <NavigationOverlay id='navigation-overlay' />
        <div id='page-content' style={{position: 'relative'}}>
          <Switch>
            {/* Admin page contents. */}
            <Route path='/admin'>
              <AdminPageContainer className='d-flex flex-row'>
                <AdminSidebar />
                <div className='flex-grow-1'>
                  <Switch exact path='/'>
                    <AdminWelcomePage />
                  </Switch>
                </div>
              </AdminPageContainer>
            </Route>

            {/* Visitor page contents. */}
            <Route path='/'>
              <Switch>
                <Route exact path='/'>
                  <HomePage />
                </Route>
                <Route exact path='/toko'>
                  <ShopListPage />
                </Route>
                <Route exact path='/produk'>
                  <ProductSearchPage displayMode={displayMode} setDisplayMode={setDisplayMode} />
                </Route>
                <Route path='/toko/warung-lorem-ipsum'>
                  <ShopProfilePage displayMode={displayMode} setDisplayMode={setDisplayMode} />
                </Route>
                <Route path='/produk/idproduk'>
                  <ProductDetailsPage />
                </Route>
                <Route path='/peta'>
                  <MarketMapPage />
                </Route>
              </Switch>
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;