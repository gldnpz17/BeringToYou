import { Tab } from "react-bootstrap";

const AdminPageTabContainer = (props) => {
  return (
    <Tab.Container {...props}>
        <div className='d-flex flex-row flex-grow-1 pb-3'>
          {props.children}
        </div>
    </Tab.Container>
  );
};

export default AdminPageTabContainer;