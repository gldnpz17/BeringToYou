import { Tab } from "react-bootstrap";

const AdminPageTabContent = (props) => {
  return (
    <Tab.Content className={`flex-grow-1 px-2 px-md-3 ${props.className}`} {...props}>
      {props.children}
    </Tab.Content>
  );
};

export default AdminPageTabContent;