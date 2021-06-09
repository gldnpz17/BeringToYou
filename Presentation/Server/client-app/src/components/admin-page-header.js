import styled from "styled-components";

const Title = styled.h1`
  font-family: 'Open Sans';
  font-size: 2rem;

  svg {
    height: 2rem;
    width: 2rem;

    margin-right: 0.25rem;

    color: ${props => props.theme.primary};
  }
`;

const AdminPageHeader = (props) => {
  return (
    <Title className='d-flex flex-row align-items-center'>
      {props.children}
      {props.title}
    </Title>
  );
};

export default AdminPageHeader;