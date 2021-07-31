import React, { useEffect } from 'react';
import { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import AdminNavigationBar from './components/admin-navigation-bar';
import NavigationBar from "./components/navigation-bar";
import VisitorNavbar from './components/visitor-navbar';
import NavigationOverlay from "./overlays/navigation-overlay";
import HomePage from "./pages/home-page";
import MarketMapPage from './pages/market-map-page';
import ProductDetailsPage from './pages/product-details-page';
import ProductSearchPage from "./pages/product-search-page";
import ShopListPage from "./pages/shop-list-page";
import ShopProfilePage from "./pages/shop-profile-page";
import VisitorHomePage from './pages/visitor-home-page';
import AdminRoute from './routes/admin-route';
import checkIdentity from './use-cases/check-identity';

export const IdentityContext = React.createContext({});

const WebContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

const ContentContainer = styled.div`
  flex-grow: 1;
  position: relative;

  margin-top: 3rem;
`;

const App = () => {
  const [identity, setIdentity] = useState(null);

  const theme = {
    primary: '#427F66',
    primaryLight: '#70AF94',
    primaryDark: '#11523C',
    secondary: '#C5D784',
    secondaryTransparent: 'rgba(197, 215, 132, 0.5)',
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
    lightButtonDarkened: '#B0BEC5',
    textDisabled: 'gray',
    adminNavLine: '#B0BEC5',
    danger: '#F44336',
    textOnDanger: 'white'
  }

  useEffect(() => {
    getIdentity();
  }, []);

  const getIdentity = async () => {
    let identity = await checkIdentity();

    setIdentity(identity);
  };

  const identityContextValue = {
    identity: identity,
    refreshIdentity: getIdentity
  };

  return (
    <ThemeProvider theme={theme}>
      <IdentityContext.Provider value={identityContextValue}>
        <BrowserRouter>
          <WebContainer>
            <Switch>
              <Route path='/admin'>
                <AdminNavigationBar id='navigation-bar' />
              </Route>
              <Route path='/'>
                <VisitorNavbar id='navigation-bar' />
              </Route>
            </Switch>
            <ContentContainer>
              <Switch>
                {/* Admin page contents. */}
                <Route path='/admin/:page?'>
                  <AdminRoute />
                </Route>

                {/* Visitor page contents. */}
                <Route path='/'>
                  <Switch>
                    <Route exact path='/(search)?'>
                      <VisitorHomePage />
                    </Route>
                  </Switch>
                </Route>
              </Switch>
            </ContentContainer>
          </WebContainer>
        </BrowserRouter>
      </IdentityContext.Provider>
    </ThemeProvider>
  );
};

export default App;