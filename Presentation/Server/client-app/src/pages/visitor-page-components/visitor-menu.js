import styled from "styled-components";
import NavMenuItem from "../../components/nav-menu-item";
import AdminIcon from "../../svg/admin-icon";
import HelpIcon from '../../svg/help-icon';

const Container = styled.div`
  p {
    font-weight: lighter;
    color: black;
    font-size: 1.8rem;
    line-height: 90%;
  }

  svg {
    color: ${props => props.theme.primary};
    width: 2.4rem;
    height: 2.4rem;
  }
`;

const VisitorMenu = () => {
  return (
    <Container className='h-100 d-flex flex-column justify-content-center align-items-center'>
      <div>
        <NavMenuItem name='Admin' href='/admin'>
          <AdminIcon />
        </NavMenuItem>
        <NavMenuItem name='Bantuan' href='/bantuan'>
          <HelpIcon />
        </NavMenuItem>
      </div>
    </Container>
  );
};

export default VisitorMenu;