import styled from "styled-components";

const Container = styled.div`
  background-color: #FAFAFA;
  border-radius: 0.25rem;

  box-shadow: rgba(45, 45, 45, 0.2) 0rem 0rem 0.5rem;

  h1 {
    font-family: 'Open Sans';
    font-size: 1.4rem;
  }
`;

const AdminFormContainer = (props) => {
  return (
    <Container className='p-3 mb-3' {...props} />
  );
};

export default AdminFormContainer;