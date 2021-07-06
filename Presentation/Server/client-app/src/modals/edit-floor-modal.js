import { Modal, Form } from "react-bootstrap";
import AdminFormControl from "../components/admin-form-control";
import AdminFormGroup from "../components/admin-form-group";
import AdminModal from "../components/admin-modal";
import CustomButton from "../components/custom-button";

const EditFloorModal = (props) => {
  return (
    <AdminModal {...props}>
      <Modal.Header>
        <Modal.Title>Ubah Lantai</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <AdminFormGroup label='Lantai'>
            <AdminFormControl type='text' defaultValue={props.floor?.floorNumber} />
          </AdminFormGroup>
          <AdminFormGroup label='File KML'>
            <AdminFormControl type='file' />
          </AdminFormGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <CustomButton>Simpan</CustomButton>
        <CustomButton secondary onClick={() => props.setShow(false)}>Batal</CustomButton>
      </Modal.Footer>
    </AdminModal>
  );
};

export default EditFloorModal;