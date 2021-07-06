import { Modal, Form } from "react-bootstrap";
import AdminFormControl from "../components/admin-form-control";
import AdminFormGroup from "../components/admin-form-group";
import AdminModal from "../components/admin-modal";
import CustomButton from "../components/custom-button";

const CreateOverlayModal = (props) => {
  return (
    <AdminModal {...props}>
      <Modal.Header>
        <Modal.Title>Buat Overlay Baru</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <AdminFormGroup label='Nama'>
            <AdminFormControl type='text' />
          </AdminFormGroup>
          <AdminFormGroup label='Z-Index'>
            <AdminFormControl type='text' />
          </AdminFormGroup>
          <AdminFormGroup label='Lantai'>
            <AdminFormControl type='text' />
          </AdminFormGroup>
          <AdminFormGroup label='File KML'>
            <AdminFormControl type='file' />
          </AdminFormGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <CustomButton>Buat overlay</CustomButton>
        <CustomButton secondary onClick={() => props.setShow(false)}>Batal</CustomButton>
      </Modal.Footer>
    </AdminModal>
  );
};

export default CreateOverlayModal;