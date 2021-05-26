import React from 'react';
import { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import NavigationBar from "./components/navigation-bar";
import NavigationOverlay from "./overlays/navigation-overlay";
import ViewProductOverlay from './overlays/view-product-overlay';
import HomePage from "./pages/home-page";
import ProductDetailsPage from './pages/product-details-page';
import ProductSearchPage from "./pages/product-search-page";
import ShopListPage from "./pages/shop-list-page";
import ShopProfilePage from "./pages/shop-profile-page";

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
    semiTransparentWhite : 'rgba(255, 255, 255, 0.75)'
  }

  const [displayMode, setDisplayMode] = useState('list');
  console.log(`p:${displayMode}`);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <NavigationBar />
        <NavigationOverlay id='navigation-overlay' />
        <ViewProductOverlay id='view-product-overlay' />
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
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;