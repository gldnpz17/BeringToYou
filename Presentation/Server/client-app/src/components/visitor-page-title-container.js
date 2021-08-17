import styled from "styled-components";

const Container = styled.div`
  svg {
    width: 2rem !important;
    height: 2rem !important;
  }

  h1 {
    margin: 0;
    padding-left: 0.3rem;
    font-size: 2rem;
  }
`;

const VisitorPageTitleContainer = ({ children, ...props }) => {
  return (
    <Container className='title d-flex flex-row px-2 mb-2 pt-2 align-items-center'>
      {children}
    </Container>
  );
};

export default VisitorPageTitleContainer;