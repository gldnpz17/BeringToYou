import { Modal, ModalBody } from "react-bootstrap";
import AdminFormControl from "../components/admin-form-control";
import AdminFormGroup from "../components/admin-form-group";
import AdminModal from "../components/admin-modal";
import CustomButton from "../components/custom-button";

const DeleteOverlayModal = (props) => {
  return (
    <AdminModal {...props}>
      <Modal.Header>
        <Modal.Title>Hapus Overlay</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AdminFormGroup label='ID'>
          <AdminFormControl type='text' readOnly defaultValue={props.overlay?.id} />
        </AdminFormGroup>
        <AdminFormGroup label='Nama'>
          <AdminFormControl type='text' readOnly defaultValue={props.overlay?.name} />
        </AdminFormGroup>
      </Modal.Body>
      <Modal.Footer>
        <CustomButton danger>Hapus</CustomButton>
        <CustomButton secondary onClick={() => props.setShow(false)}>Batal</CustomButton>
      </Modal.Footer>
    </AdminModal>
  );
};

export default DeleteOverlayModal;