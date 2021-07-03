import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const AdminPageContainer = (props) => {
  return (
    <Container className={`d-flex flex-column p-3 pe-0 pb-0 ${props.className}`} {...props} />
  );
};

export default AdminPageContainer;