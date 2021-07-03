import { Nav } from "react-bootstrap";
import styled from "styled-components";

const PageNav = styled(Nav)`
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

const AdminPageNav = (props) => {
  return (
    <PageNav className={`d-flex flex-column ${props.className}`} {...props} />
  );
};

export default AdminPageNav;