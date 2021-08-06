import styled from "styled-components";

const Container = styled.div`
  position: relative;
  background-color: #FAFAFA;
  border-radius: 0.25rem;
  overflow: hidden;

  box-shadow: rgba(45, 45, 45, 0.2) 0rem 0rem 0.5rem;

  h1 {
    font-family: 'Open Sans';
    font-size: 1.4rem;
  }
`;

const DisabledOverlay = styled.div`
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  z-index: 10;
  margin: 0;

  background-color: rgba(100, 100, 100, 50%);

  & #disabled-reason {
    font-family: 'Open Sans';
    user-select: none;
    font-size: 2rem;
  }
`;

const AdminFormContainer = ({disabled, disabledReason, children, ...props}) => {
  return (
    <Container className='p-3 mb-3' {...props}>
      {disabled ?
        <DisabledOverlay><p id='disabled-reason'>{disabledReason ?? ''}</p></DisabledOverlay>
      : null}
      {children}
    </Container>
  );
};

export default AdminFormContainer;