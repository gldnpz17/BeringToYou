import AdminModal from "../components/admin-modal";
import { Form, Modal, Row, Col } from "react-bootstrap";
import CustomButton from "../components/custom-button";
import AdminFormControl from "../components/admin-form-control";
import AdminFormGroup from "../components/admin-form-group";

const CreatePermissionPresetModal = (props) => {
  return (
    <AdminModal {...props}>
      <Modal.Header>
        <Modal.Title>Buat Preset Wewenang Baru</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <AdminFormGroup label='Nama preset'>
            <AdminFormControl type='text' />
          </AdminFormGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <CustomButton>Buat preset</CustomButton>
        <CustomButton secondary onClick={() => props.setShow(false)}>Batal</CustomButton>
      </Modal.Footer>
    </AdminModal>
  );
};

export default CreatePermissionPresetModal;