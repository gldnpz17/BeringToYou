import { SnackbarProvider } from 'notistack';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import AdminNavigationBar from './components/admin-navigation-bar';
import VisitorNavbar from './components/visitor-navbar';
import VisitorHomePage from './pages/visitor-home-page';
import AdminRoute from './routes/admin-route';
import checkIdentity from './use-cases/check-identity';

export const IdentityContext = React.createContext({});

const WebContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  width: 100%;
`;

const ContentContainer = styled.div`
  flex-grow: 1;
  position: relative;

  margin-top: 3rem;
`;

const App = () => {
  const [identity, setIdentity] = useState(null);

  const theme = {
    primary: '#7b1fa2',
    textOnPrimary: 'white',
    primaryLight: '#ae52d4',
    primaryDark: '#4a0072',
    secondary: '#c2185b',
    secondaryTransparent: '#f48fb1',
    secondaryLight: '#fa5788',
    secondaryLightTransparent: '#f8bbd0',
    secondaryDark: '#8c0032',
    whitespace: '#F5F5F5',
    shadow: 'rgba(0, 0, 0, 0.5)',
    semiTransparentWhite: 'rgba(255, 255, 255, 0.75)',
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
    adminSidebar: '#f3e5f5',
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
      <SnackbarProvider maxSnack={3}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        autoHideDuration={2500}
      >
        <BrowserRouter>
          <WebContainer>
            <Switch>
              <Route path='/admin'>
                <IdentityContext.Provider value={identityContextValue}>
                  <AdminNavigationBar id='navigation-bar' />
                </IdentityContext.Provider>
              </Route>
              <Route path='/'>
                <VisitorNavbar id='navigation-bar' />
              </Route>
            </Switch>
            <ContentContainer>
              <Switch>
                {/* Admin page contents. */}
                <Route path='/admin'>
                  <IdentityContext.Provider value={identityContextValue}>
                    <AdminRoute />
                  </IdentityContext.Provider>
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
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;