import styled from "styled-components";
import AdminPageContainer from "../components/admin-page-container";
import BeringharjoLogo from "../svg/beringharjo-logo";

const StyledLogo = styled(BeringharjoLogo)`
  width: 50vw;
  height: 50vh;
  color: ${props => props.theme.primary};

  animation-duration: 2s;
  animation-name: logo-animate;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-direction: alternate-reverse;

  @keyframes logo-animate {
    from {
      opacity: 45%;
    }

    to {
      opacity: 35%;
    }
  }
`;

const MessageContainer = styled.div`
  font-family: 'Open Sans';

  text-align: center;
`;

const AdminWelcomePage = () => {
  return (
    <AdminPageContainer>
      <div className='d-flex flex-column align-items-center justify-content-center h-100 me-2'>
        <StyledLogo />
        <MessageContainer>
          <h1>Selamat Datang!</h1>
          <p>Silahkan memilih salah satu menu di sidebar</p>
        </MessageContainer>
      </div>
    </AdminPageContainer>
  );
};

export default AdminWelcomePage;