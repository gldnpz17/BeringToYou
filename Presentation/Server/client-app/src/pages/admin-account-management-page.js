import { Form, Nav, Tab, Table } from "react-bootstrap";
import AdminPageContainer from "../components/admin-page-container";
import AdminPageHeader from "../components/admin-page-header";
import AdminPageNav from "../components/admin-page-nav";
import AdminPageNavLink from "../components/admin-page-nav-link";
import AdminPageTabContainer from "../components/admin-page-tab-container";
import AccountIcon from "../svg/account-icon";
import AdminIcon from "../svg/admin-icon";
import AccountsIcon from "../svg/accounts-icon";
import AdminAccountIcon from '../svg/admin-account-icon';
import PlainAccountIcon from '../svg/plain-account-icon';
import VerifiedIcon from '../svg/verified-icon';
import AdminPageTabContent from "../components/admin-page-tab-content";
import AdminFormContainer from '../components/admin-form-container';
import CustomButton from "../components/custom-button";
import AdminFormControl from "../components/admin-form-control";
import AccountSearchIcon from '../svg/account-search-icon';

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
          <Tab.Pane eventKey='admin-accounts'>
            <AdminFormContainer>
              <div className='d-flex flex-row mb-3 align-items-center flex-wrap'>
                <AdminFormControl type='text' placeholder='Cari akun' className='m-1' style={{maxWidth: '15rem'}} />
                <div className='flex-grow-1' />
                <CustomButton className='m-1'>Akun baru</CustomButton>
              </div>
              <div style={{position: 'relative', minHeight: '10rem', overflow: 'scroll'}}>
                <Table style={{position: 'absolute', left: 0, right: 0}}>
                  <thead>
                    <tr>
                      <th>Identitas</th>
                      <th>Wewenang</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                </Table>
              </div>
            </AdminFormContainer>
          </Tab.Pane>
          <Tab.Pane eventKey='merchant-accounts'>
            <h1>Merchant</h1>
          </Tab.Pane>
        </AdminPageTabContent>
      </AdminPageTabContainer>
    </AdminPageContainer>
  );
};

export default AdminAccountManagementPage;