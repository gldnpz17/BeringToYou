import styled from "styled-components";

const StyledAnchor = styled.a`
  color: ${props => props.theme.whitespace};
  text-decoration: none;
`;

const NavMenuItem = ({ href, name, children, className }) => {
  return (
    <StyledAnchor href={href} className={className}>
      <div className='d-flex flex-row align-items-center mb-4'>
        {children}
        <p className='m-0 ms-2'>{name}</p>
      </div>
    </StyledAnchor>
  );
};

export default NavMenuItem;