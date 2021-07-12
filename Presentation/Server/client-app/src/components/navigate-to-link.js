import styled from "styled-components";
import NextIcon from "../svg/next-icon";

const Link = styled.a`
  color: black;
  text-decoration: none;
  p {
    transition-duration: 0.2s;
  }

  svg {
    width: 1.2rem;
    height: 1.2rem;

    transition-duration: 0.2s;
  }

  :hover {
    color: ${props => props.theme.secondary};

    svg {
      transform: translateX(0.1rem);
    }
  }

  :active {
    color: ${props => props.theme.secondary};

    svg {
      transform: translateX(0.1rem);
    }
  }
`;

const NavigateToLink = (props) => {
  return (
    <Link {...props} className='d-flex flex-row align-items-center'>
      <p className='m-0 mr-1'>{props.text}</p>
      <NextIcon />
    </Link>
  );
};

export default NavigateToLink;