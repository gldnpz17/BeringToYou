import { Route, Switch, useParams, useRouteMatch } from "react-router";
import styled from "styled-components";
import AdminSidebar from "../components/admin-sidebar";
import AdminWelcomePage from "../pages/admin-welcome-page";
import AdminAccountPage from '../pages/admin-account-page';
import AdminAdminPage from '../pages/admin-admin-page';
import AdminMapPage from '../pages/admin-map-page';
import AdminShopPage from '../pages/admin-map-page';
import AdminMiscPage from '../pages/admin-misc-page';

const AdminPageContainer = styled.div`
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
  let { page } = useParams();

  return (
    <AdminPageContainer className='d-flex flex-row'>
      <AdminSidebar page={page} />
      <Switch>
        <ContentContainer className='flex-grow-1'>
          {(page === undefined) ? <AdminWelcomePage /> : null }
          <Route exact path={`${path}/akun`}>
            <AdminAccountPage />
          </Route>
          <Route exact path={`${path}/admin`}>
            <AdminAdminPage />
          </Route>
          <Route exact path={`${path}/peta-digital`}>
            <AdminMapPage />
          </Route>
          <Route exact path={`${path}/toko`}>
            <AdminShopPage />
          </Route>
          <Route exact path={`${path}/lain-lain`}>
            <AdminMiscPage />
          </Route>
        </ContentContainer>
      </Switch>
    </AdminPageContainer>
  );
};

export default AdminRoute;
