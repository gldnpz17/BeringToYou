import { Modal } from "react-bootstrap";
import AdminFormControl from "../components/admin-form-control";
import AdminFormGroup from "../components/admin-form-group";
import AdminModal from "../components/admin-modal";
import CustomButton from "../components/custom-button";
import FormCheck from '../components/form-check';
import updatePermissionPreset from '../use-cases/admin/account-management/update-permission-preset';

const EditPermissionPresetModal = ({ permissionPreset, ...props }) => {
  const handleEditPermissionPreset = async () => {
    const getCheckValue = (checkId) => {
      return document.getElementById(checkId).checked;
    }

    await updatePermissionPreset(
      permissionPreset?.name,
      {
        canManageAccounts: getCheckValue('manage-accounts-check'),
        canManagePermissions: getCheckValue('manage-permissions-check'),
        canManageMap: getCheckValue('manage-map-check'),
        canManageShops: getCheckValue('manage-shops-check'),
        canBackupData: getCheckValue('backup-data-check')
      });

    props.setShow(false);
  }

  return (
    <AdminModal {...props}>
      <Modal.Header>
        <Modal.Title>Ubah Preset Wewenang</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AdminFormGroup label='Nama'>
          <AdminFormControl type='text' readOnly defaultValue={permissionPreset?.name} />
        </AdminFormGroup>
        <AdminFormGroup label='Wewenang'>
          <FormCheck id='manage-accounts-check' label='Dapat mengatur akun' defaultChecked={permissionPreset?.canManageAccounts} />
          <FormCheck id='manage-permissions-check' label='Dapat mengatur wewenang' defaultChecked={permissionPreset?.canManagePermissions} />
          <FormCheck id='manage-map-check' label='Dapat mengatur peta' defaultChecked={permissionPreset?.canManageMap} />
          <FormCheck id='manage-shops-check' label='Dapat mengatur toko beserta dagangannya' defaultChecked={permissionPreset?.canManageShops} />
          <FormCheck id='backup-data-check' label='Dapat mengatur backup dan restorasi database' defaultChecked={permissionPreset?.canBackupData} />
        </AdminFormGroup>
      </Modal.Body>
      <Modal.Footer>
        <CustomButton onClick={() => handleEditPermissionPreset()}>Simpan</CustomButton>
        <CustomButton secondary onClick={() => props.setShow(false)}>Batal</CustomButton>
      </Modal.Footer>
    </AdminModal>
  );
};

export default EditPermissionPresetModal;