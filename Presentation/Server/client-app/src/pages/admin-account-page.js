import { Form, Nav, Tab } from "react-bootstrap";
import styled from "styled-components";
import AdminPageHeader from "../components/admin-page-header";
import CustomButton from "../components/custom-button";
import AccountIcon from "../svg/account-icon";
import ProfileIcon from '../svg/profile-icon';
import SecurityIcon from '../svg/security-icon';
import responsiveBreakpoints from '../helpers/responsive-breakpoints';

const AdminPageNav = styled(Nav)`
  position: relative;

  ::after {
    z-index: 1;
    content: '';

    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;

    width: 0.1rem;
    background-color: ${props => props.theme.adminNavLine};
  }
`;

const AdminPageNavLink = styled(Nav.Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 0.5rem;
  padding-right: 0.5rem;

  @media(min-width: ${responsiveBreakpoints.medium}) {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    width: 10rem; 
  }

  position: relative;

  * {
    transition-duration: 0.3s;
  }

  svg {
    width: 1.6rem;
    height: 1.6rem;

    color: ${props => props.theme.primary}
  }

  p {
    margin-bottom: 0;
    margin-left: 0.25rem;
    font-size: 1.2rem;

    @media(max-width: ${responsiveBreakpoints.medium}) {
      display: none;
    }

    color: black;
  }

  ::after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;

    z-index: 2;

    width: 0.2rem;
    transform: translateX(25%);
    background-color: ${props => props.theme.primary};

    transition-duration: 0.3s;
  }

  :hover {
    svg,p {
      filter: brightness(75%);
    }
  }

  &[aria-selected=false] {
    svg {
      color: ${props => props.theme.primaryLight};
    }

    p {
      color: ${props => props.theme.textDisabled};
    }

    ::after {
      top: 50%;
      bottom: 50%;
      opacity: 0;
    }
  }
`;

const PageContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const AdminAccountPage = () => {
  return (
    <PageContainer className='d-flex flex-column p-3 pb-0'>
      <AdminPageHeader title='Akun'>
        <AccountIcon />
      </AdminPageHeader>
      <Tab.Container id='hello' defaultActiveKey='profile'>
        <div className='d-flex flex-row flex-grow-1 pb-3'>
          <AdminPageNav className='d-flex flex-column'>
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
          <Tab.Content className='flex-grow-1 px-3'>
            <Tab.Pane eventKey='profile'>
              <Form className='mb-3'>
                <Form.Group>
                  <Form.Label>Ubah foto profil</Form.Label>
                  <Form.Control className='w-100' type='file' />
                </Form.Group>
              </Form>
              <Form className='mb-3'>
                <Form.Group className='mb-2'>
                  <Form.Label>Ubah nama</Form.Label>
                  <Form.Control type='text' />
                </Form.Group>
                <CustomButton>Ubah</CustomButton>
              </Form>
            </Tab.Pane>
            <Tab.Pane eventKey='security'>
              <Form className='mb-4'>
                <Form.Group className='mb-2'>
                  <Form.Label>Ubah kata sandi</Form.Label>
                  <Form.Control className='mb-1' type='text' placeholder='Kode' />
                  <Form.Control type='text' placeholder='Kata sandi baru' />
                </Form.Group>
                <CustomButton className='me-2'>Ubah</CustomButton>
                <CustomButton secondary={true}>Kirim Kode</CustomButton>
              </Form>
              <Form className='mb-4'>
                <Form.Group className='d-flex flex-column align-items-start'>
                  <Form.Label>Autentikasi 2 Faktor</Form.Label>
                  <CustomButton className='me-2'>Atur TOTP</CustomButton>
                </Form.Group>
              </Form>
              <Form className='mb-4'>
                <Form.Group className='d-flex flex-column align-items-start'>
                  <Form.Label>Backup Code</Form.Label>
                  <CustomButton aria-disabled='true' className='me-2'>Lihat backup code</CustomButton>
                </Form.Group>
              </Form>
            </Tab.Pane>
          </Tab.Content>
        </div>
      </Tab.Container>
    </PageContainer>
  );
};

export default AdminAccountPage;