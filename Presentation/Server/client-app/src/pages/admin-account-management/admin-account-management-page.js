import { Nav } from "react-bootstrap";
import AdminPageContainer from "../../components/admin-page-container";
import AdminPageHeader from "../../components/admin-page-header";
import AdminPageNav from "../../components/admin-page-nav";
import AdminPageNavLink from "../../components/admin-page-nav-link";
import AdminPageTabContainer from "../../components/admin-page-tab-container";
import AdminPageTabContent from "../../components/admin-page-tab-content";
import AccountsIcon from "../../svg/accounts-icon";
import AdminAccountIcon from '../../svg/admin-account-icon';
import PlainAccountIcon from '../../svg/plain-account-icon';
import AdminAccountsTab from './tabs/admin-accounts-tab';
import MerchantAccountsTab from "./tabs/merchant-accounts-tab";

const AdminAccountManagementPage = () => {
  return (
    <AdminPageContainer>
      <AdminPageHeader title='Manajemen Akun'>
        <AccountsIcon />
      </AdminPageHeader>
      <AdminPageTabContainer defaultActiveKey='admin-accounts'>
        <AdminPageNav>
          <Nav.Item>
            <AdminPageNavLink eventKey='admin-accounts'>
              <AdminAccountIcon />
              <p>Admin</p>
            </AdminPageNavLink>
          </Nav.Item>
          <Nav.Item>
            <AdminPageNavLink eventKey='merchant-accounts'>
              <PlainAccountIcon />
              <p>Pedagang</p>
            </AdminPageNavLink>
          </Nav.Item>
        </AdminPageNav>
        <AdminPageTabContent>
          <AdminAccountsTab  eventKey='admin-accounts'/>
          <MerchantAccountsTab eventKey='merchant-accounts' />
        </AdminPageTabContent>
      </AdminPageTabContainer>
    </AdminPageContainer>
  );
};

export default AdminAccountManagementPage;