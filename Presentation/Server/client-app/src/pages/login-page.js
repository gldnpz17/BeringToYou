import { Form } from "react-bootstrap";
import styled from "styled-components";
import AdminFormControl from '../components/admin-form-control';
import CustomButton from "../components/custom-button";

const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
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

const LoginPage = () => {
  return (
    <Container className='d-flex align-items-center justify-content-center'>
      <ContainerBackground />
      <ContentContainer className='p-3'>
        <ContentContainerBackground />
        <h1 className='text-center'>Log In</h1>
        <Form className='d-flex flex-column'>
          <Form.Group className='mb-3'>
            <Form.Label>Email</Form.Label>
            <AdminFormControl type='text' />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Password</Form.Label>
            <AdminFormControl type='password' />
          </Form.Group>
          <CustomButton className='align-self-center'>Log In</CustomButton>
        </Form>
      </ContentContainer>
    </Container>
  );
};

export default LoginPage;