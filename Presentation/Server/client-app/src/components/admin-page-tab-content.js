import { Tab } from "react-bootstrap";

const AdminPageTabContent = (props) => {
  return (
    <Tab.Content className={`flex-grow-1 pl-2 pl-md-3 ${props.className}`} {...props}>
      {props.children}
    </Tab.Content>
  );
};

export default AdminPageTabContent;