import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import AdminFormControl from "../../../components/admin-form-control";
import AdminFormGroup from "../../../components/admin-form-group";
import AdminModal from "../../../components/admin-modal";
import CustomButton from "../../../components/custom-button";
import AccountManagement from "../../../use-cases/account-management";
import PermissionPreset from "../../../use-cases/permission-preset";

const EditAdminAccountPermissionModal = ({ accountToEdit, show, setShow, ...props }) => {
  const [permissionPresets, setPermissionPresets] = useState([]);
  const [accountPermission, setAccountPermission] = useState(null);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (show && accountToEdit) {
      loadData();
    }
  }, [show, accountToEdit])

  const loadData = async () => {
    setPermissionPresets(await PermissionPreset.readAllPermissionPresets())
    setAccountPermission(await PermissionPreset.readAdminAccountPermissionPreset(accountToEdit?.id));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    let data = new FormData(event.target);

    let response = await AccountManagement.updateAdminAccountPermissions(
      data.get('id'),
      data.get('permission')
    );

    if (response.status === 200) {
      enqueueSnackbar('Perubahan wewenang akun berhasil disimpan.', {
        variant: 'success'
      });

      setShow(false);
    } else {
      enqueueSnackbar('Perubahan wewenang akun gagal disimpan', {
        variant: 'error'
      });
    }
  }
  
  if (accountToEdit) {
    return (
      <AdminModal show={show} setShow={setShow} {...props}>
        <form method='POST' onSubmit={handleSubmit}>
          <Modal.Header>
            <Modal.Title>Ubah Wewenang Akun Admin</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AdminFormGroup label='ID'>
              <AdminFormControl type='text' name='id' 
                defaultValue={accountToEdit.id} readOnly
              />
            </AdminFormGroup>
            <AdminFormGroup label='Nama'>
              <AdminFormControl type='text' name='id' 
                defaultValue={accountToEdit.displayName} readOnly
              />
            </AdminFormGroup>
            <AdminFormGroup label='Wewenang'>
              <AdminFormControl as='select' name='permission'>
                {permissionPresets.map(preset => {
                  return (
                    <option 
                      value={preset.name} 
                      selected={preset.name === accountPermission?.name}
                    >
                      {preset.name}
                    </option>
                  );
                })}
              </AdminFormControl>
            </AdminFormGroup>
          </Modal.Body>
          <Modal.Footer>
            <CustomButton type='submit' onClick={() => {}}>Simpan</CustomButton>
            <CustomButton secondary onClick={() => setShow(false)}>Batal</CustomButton>
          </Modal.Footer>
        </form>
      </AdminModal>
    );
  } else {
    return null;
  }
}

export default EditAdminAccountPermissionModal;