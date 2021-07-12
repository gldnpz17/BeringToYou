import { Form, Nav, Tab } from "react-bootstrap";
import styled from "styled-components";
import AdminPageHeader from "../components/admin-page-header";
import CustomButton from "../components/custom-button";
import AccountIcon from "../svg/account-icon";
import ProfileIcon from '../svg/profile-icon';
import SecurityIcon from '../svg/security-icon';
import responsiveBreakpoints from '../helpers/responsive-breakpoints';
import AdminFormContainer from '../components/admin-form-container';
import AdminPageNavLink from "../components/admin-page-nav-link";
import AdminPageNav from "../components/admin-page-nav";
import AdminPageContainer from '../components/admin-page-container';
import AdminPageTabContainer from '../components/admin-page-tab-container';
import AdminPagetabContent from '../components/admin-page-tab-content';

const AdminAccountPage = () => {
  return (
    <AdminPageContainer>
      <AdminPageHeader title='Akun Pribadi'>
        <AccountIcon />
      </AdminPageHeader>
      <AdminPageTabContainer defaultActiveKey='profile'>
        <AdminPageNav>
          <Nav.Item>
            <AdminPageNavLink eventKey='profile'>
              <ProfileIcon />
              <p>Profil</p>
            </AdminPageNavLink>
          </Nav.Item>
          <Nav.Item>
            <AdminPageNavLink eventKey='security'>
              <SecurityIcon />
              <p>Keamanan</p>
            </AdminPageNavLink>
          </Nav.Item>
        </AdminPageNav>
        <AdminPagetabContent>
          <Tab.Pane eventKey='profile'>
            <AdminFormContainer>
              <h1 className='mb-3'>Informasi Diri</h1>
              <Form className='mb-3'>
                <Form.Group>
                  <Form.Label>Foto profil</Form.Label>
                  <Form.Control className='w-100' type='file' />
                </Form.Group>
              </Form>
              <Form>
                <Form.Group className='mb-2'>
                  <Form.Label>Nama</Form.Label>
                  <Form.Control type='text' />
                </Form.Group>
                <CustomButton>Ubah</CustomButton>
              </Form>
            </AdminFormContainer>
          </Tab.Pane>
          <Tab.Pane eventKey='security'>
            <AdminFormContainer>
              <h1 className='mb-3'>Kata Sandi</h1>
              <Form className='mb-3'>
                <Form.Group className='mb-2'>
                  <Form.Label>Ubah kata sandi</Form.Label>
                  <Form.Control className='mb-1' type='text' placeholder='Kode' />
                  <Form.Control type='text' placeholder='Kata sandi baru' />
                </Form.Group>
                <CustomButton className='mr-2'>Ubah</CustomButton>
                <CustomButton secondary={true}>Kirim Kode</CustomButton>
              </Form>
            </AdminFormContainer>
            <AdminFormContainer>
              <h1 className='mb-3'>Autentikasi 2 Faktor</h1>
              <Form className='mb-3'>
                <Form.Group className='d-flex flex-column align-items-start'>
                  <Form.Label>Time-based One-Time Password</Form.Label>
                  <CustomButton className='mr-2'>Atur TOTP</CustomButton>
                </Form.Group>
              </Form>
              <Form>
                <Form.Group className='d-flex flex-column align-items-start'>
                  <Form.Label>Backup Code</Form.Label>
                  <CustomButton aria-disabled='true' className='mr-2'>Lihat backup code</CustomButton>
                </Form.Group>
              </Form>
            </AdminFormContainer>
          </Tab.Pane>
        </AdminPagetabContent>
      </AdminPageTabContainer>
    </AdminPageContainer>
  );
};

export default AdminAccountPage;