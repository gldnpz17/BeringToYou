import { Nav } from "react-bootstrap";
import styled from "styled-components";
import responsiveBreakpoints from "../helpers/responsive-breakpoints";

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

export default AdminPageNavLink;