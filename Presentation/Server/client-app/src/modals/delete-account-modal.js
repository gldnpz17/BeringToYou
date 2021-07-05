import { Modal, Form, Row, Col } from "react-bootstrap";
import AdminFormControl from "../components/admin-form-control";
import AdminModal from "../components/admin-modal";
import CustomButton from "../components/custom-button";
import AdminFormGroup from "../components/admin-form-group";

const DeleteAccountModal = (props) => {
  return (
    <AdminModal {...props}>
      <Modal.Header>
        <Modal.Title>Hapus akun</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AdminFormGroup label='ID'>
          <AdminFormControl type='text' readOnly defaultValue={props.account?.id} />
        </AdminFormGroup>
        <AdminFormGroup label='Nama'>
          <AdminFormControl type='text' readOnly defaultValue={props.account?.displayName} />
        </AdminFormGroup>
        <AdminFormGroup label='Email'>
          <AdminFormControl type='text' readOnly defaultValue={props.account?.email} />
        </AdminFormGroup>
      </Modal.Body>
      <Modal.Footer>
        <CustomButton danger>Hapus</CustomButton>
        <CustomButton secondary onClick={() => props.setShow(false)}>Batal</CustomButton>
      </Modal.Footer>
    </AdminModal>
  );
};

export default DeleteAccountModal;

