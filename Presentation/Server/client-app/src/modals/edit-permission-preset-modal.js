import { Modal, Form } from "react-bootstrap";
import AdminFormGroup from "../components/admin-form-group";
import AdminModal from "../components/admin-modal";
import CustomButton from "../components/custom-button";
import AdminFormControl from "../components/admin-form-control";
import FormCheck from '../components/form-check';

const EditPermissionPresetModal = (props) => {
  return (
    <AdminModal {...props}>
      <Modal.Header>
        <Modal.Title>Ubah Preset Wewenang</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AdminFormGroup label='Nama'>
          <AdminFormControl type='text' readOnly defaultValue={props.permissionPreset?.name} />
        </AdminFormGroup>
        <AdminFormGroup label='Wewenang'>
          <FormCheck label='Dapat mengatur akun' />
          <FormCheck label='Dapat mengatur wewenang' />
          <FormCheck label='Dapat mengatur peta' />
          <FormCheck label='Dapat mengatur toko beserta dagangannya' />
          <FormCheck label='Dapat mengatur backup dan restorasi database' />
        </AdminFormGroup>
      </Modal.Body>
      <Modal.Footer>
        <CustomButton>Simpan</CustomButton>
        <CustomButton secondary onClick={() => props.setShow(false)}>Batal</CustomButton>
      </Modal.Footer>
    </AdminModal>
  );
};

export default EditPermissionPresetModal;