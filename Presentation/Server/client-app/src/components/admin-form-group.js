import { Col, Form, Row } from "react-bootstrap";

const AdminFormGroup = (props) => {
  return (
    <Form.Group as={Row} className='mb-3' {...props}>
      <Form.Label column className='col-3'>{props.label}</Form.Label>
      <Col className='col-9'>
        {props.children}
      </Col>
    </Form.Group>
  );
};

export default AdminFormGroup;