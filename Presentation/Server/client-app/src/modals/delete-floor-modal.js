import { Modal } from "react-bootstrap";
import AdminFormControl from "../components/admin-form-control";
import AdminFormGroup from "../components/admin-form-group";
import AdminModal from "../components/admin-modal";
import CustomButton from "../components/custom-button";

const DeleteFloorModal = (props) => {
  return (
    <AdminModal {...props}>
      <Modal.Header>
        <Modal.Title>Hapus Lantai</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AdminFormGroup label='Lantai'>
          <AdminFormControl type='text' readOnly defaultValue={props.floor?.floorNumber} />
        </AdminFormGroup>
      </Modal.Body>
      <Modal.Footer>
        <CustomButton danger>Hapus</CustomButton>
        <CustomButton secondary onClick={() => props.setShow(false)}>Batal</CustomButton>
      </Modal.Footer>
    </AdminModal>
  );
};

export default DeleteFloorModal;