import { useContext, useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import styled from "styled-components";
import { IdentityContext } from "../app";
import AdminFormControl from '../components/admin-form-control';
import CustomButton from "../components/custom-button";
import createMerchantAccount from "../use-cases/admin/account-management/create-merchant-account";
import login from "../use-cases/admin/auth/login";

const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  z-index: 0;
`;

const ContainerBackground = styled.div`
  background-image: url('/images/login-background.jpg');
  background-size: cover;
  background-position-y: center;

  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  z-index: -1;
`;

const ContentContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 18rem;
  font-family: 'Open Sans';

  border-radius: 1rem;

  h1 {
    font-size: 1.8rem;
  }
`;

const ContentContainerBackground = styled.div`
  z-index: -1;

  opacity: 90%;
  filter: blur(5px);
  background-color: ${props => props.theme.whitespace};

  position: absolute;
  top: -10px;
  bottom: -10px;
  left: -10px;
  right: -10px;
`;

const MerchantSignUpLink = styled.a`
  cursor: pointer;
`

const LoginPage = () => {
  const [mode, setMode] = useState('login');
  const identityContext = useContext(IdentityContext);

  useEffect(() => {
    if (mode === 'signup') {
      document.getElementById('admin-signup-username').value = '';
      document.getElementById('admin-signup-display-name').value = '';
      document.getElementById('admin-signup-password').value = '';
    }
  }, [mode])

  const handleLogin = async () => {
    const usernameInput = document.getElementById('admin-login-username');
    const passwordInput = document.getElementById('admin-login-password');

    let loginSuccess = await login(usernameInput.value, passwordInput.value);

    if (loginSuccess) {
      await identityContext.refreshIdentity();
    } else {
      usernameInput.value = '';
      passwordInput.value = '';

      alert('Incorrect username or password.');
    }
  };

  const handleSignup = async () => {
    let username = document.getElementById('admin-signup-username').value;
    let displayName = document.getElementById('admin-signup-display-name').value;
    let password = document.getElementById('admin-signup-password').value;

    await createMerchantAccount(
      username,
      displayName,
      password
    );

    setMode('login');

    document.getElementById('admin-login-username').value = username;
    document.getElementById('admin-login-password').value = password;

    await handleLogin();
  }

  return (
    <Container className='d-flex align-items-center justify-content-center'>
      <ContainerBackground />
      <ContentContainer className='p-3'>
        <ContentContainerBackground />
        {(() => {
          switch (mode) {
            case 'login':
              return (
                <>
                  <h1 className='text-center mb-3'>Selamat Datang!</h1>
                  <Form className='d-flex flex-column mb-3'>
                    <Form.Group className='mb-2'>
                      <Form.Label>Nama Pengguna (Username)</Form.Label>
                      <AdminFormControl id='admin-login-username' type='text' />
                    </Form.Group>
                    <Form.Group className='mb-2'>
                      <Form.Label>Kata sandi</Form.Label>
                      <AdminFormControl id='admin-login-password' type='password' />
                    </Form.Group>
                    <CustomButton 
                      className='align-self-center' 
                      onClick={handleLogin}
                    >
                      Masuk
                    </CustomButton>
                  </Form>
                  <div className='text-center'>
                    <p className='m-0'>Belum punya akun?</p>
                    <MerchantSignUpLink onClick={() => setMode('signup')}>Daftar sebagai pedagang!</MerchantSignUpLink>
                  </div>
                </>
              );
            case 'signup':
              return (
                <>  
                  <h1 className='text-center mb-3'>Daftar</h1>
                  <Form className='d-flex flex-column mb-3'>
                    <Form.Group className='mb-2'>
                      <Form.Label>Nama Pengguna (Username)</Form.Label>
                      <AdminFormControl id='admin-signup-username' name='admin-signup-username' type='text' placeholder='budi123' />
                    </Form.Group>
                    <Form.Group className='mb-2'>
                      <Form.Label>Nama Lengkap</Form.Label>
                      <AdminFormControl id='admin-signup-display-name' name='admin-signup-display-name' type='text' placeholder='Budi Budiman' />
                    </Form.Group>
                    <Form.Group className='mb-2'>
                      <Form.Label>Kata sandi</Form.Label>
                      <AdminFormControl id='admin-signup-password' name='admin-signup-password' type='password' />
                    </Form.Group>
                    <CustomButton 
                      className='align-self-center' 
                      onClick={handleSignup}
                    >
                      Daftar
                    </CustomButton>
                  </Form>
                  <div className='text-center'>
                    <p className='m-0'>Sudah memiliki akun? <MerchantSignUpLink onClick={() => setMode('login')}>Masuk!</MerchantSignUpLink></p>
                  </div>
                </>
              );
          }
        })()}
      </ContentContainer>
    </Container>
  );
};

export default LoginPage;