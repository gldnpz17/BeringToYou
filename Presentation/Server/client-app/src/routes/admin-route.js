import { Route, Switch, useParams, useRouteMatch } from "react-router";
import styled from "styled-components";
import AdminSidebar from "../components/admin-sidebar";
import AdminWelcomePage from "../pages/admin-welcome-page";
import AdminAccountPage from '../pages/admin-account-page';
import AdminAdminPage from '../pages/admin-account-management-page';
import AdminMapPage from '../pages/admin-map-page';
import AdminShopPage from '../pages/admin-shop-page';
import AdminMiscPage from '../pages/admin-misc-page';
import { useContext, useEffect, useState } from "react";
import checkAuthStatus from "../use-cases/check-identity";
import AuthPage from '../pages/auth-page';
import React from "react";
import { IdentityContext } from "../app";
import RequireAuthenticationRoute from "../components/auth/require-authentication-route";

const AdminPageContainer = styled.div`
  background-color: ${props => props.theme.whitespace};

  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const ContentContainer = styled.div`
  overflow-y: scroll;

  position: relative;
`;

const AdminRoute = () => {
  let { path, url } = useRouteMatch();

  return (
    <AdminPageContainer className='d-flex flex-row'>
      <Switch>
        <Route path={`${path}/auth/:mode`}>
          <AuthPage />
        </Route>
        <RequireAuthenticationRoute path={`${path}/:page?`}>
          <AdminSidebar />
          <ContentContainer className='flex-grow-1'>
            <Switch>
              <Route exact path={`${path}`}>
                <AdminWelcomePage />
              </Route>
              <Route path={`${path}/akun-pribadi`}>
                <AdminAccountPage />
              </Route>
              <Route path={`${path}/manajemen-akun`}>
                <AdminAdminPage />
              </Route>
              <Route path={`${path}/peta-digital`}>
                <AdminMapPage />
              </Route>
              <Route path={`${path}/toko`}>
                <AdminShopPage />
              </Route>
              <Route path={`${path}/lain-lain`}>
                <AdminMiscPage />
              </Route>
            </Switch>
          </ContentContainer>
        </RequireAuthenticationRoute>
      </Switch>
    </AdminPageContainer>
  );
};

export default AdminRoute;