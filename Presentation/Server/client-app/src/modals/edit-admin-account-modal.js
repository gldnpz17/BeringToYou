import { useEffect, useState } from "react";
import { Modal, Form, Row, Col } from "react-bootstrap";
import AdminFormControl from "../components/admin-form-control";
import AdminModal from "../components/admin-modal";
import CustomButton from "../components/custom-button";
import fetchAdminAccountPermissions from "../use-cases/admin/account-management/fetch-admin-account-permissions";
import fetchAllPermissionPresets from "../use-cases/admin/account-management/fetch-all-permission-presets";
import AdminFormGroup from "../components/admin-form-group";

const EditAdminAccountModal = (props) => {
  const [permissionPresets, setPermissionPresets] = useState([]);
  const [accountPermissions, setAccountPermissions] = useState(null);

  useEffect(() => {
    getAccountData(props.account);

    getAllPermissionPresets();
  }, [props.account])

  const getAccountData = async (account) => {
    if (account !== null && account !== undefined) {
      let result = await fetchAdminAccountPermissions(account.id);

      setAccountPermissions(result);
    }
  };

  const getAllPermissionPresets = async () => {
    setPermissionPresets(await fetchAllPermissionPresets());
  };

  return (
    <AdminModal {...props}>
      <Modal.Header>
        <Modal.Title>Edit Akun Admin</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AdminFormGroup label='ID'>
          <AdminFormControl type='text' readOnly defaultValue={props.account?.id} />
        </AdminFormGroup>
        <AdminFormGroup label='Nama'>
          <AdminFormControl type='text' readOnly defaultValue={props.account?.displayName} />
        </AdminFormGroup>
        <AdminFormGroup label='Preset wewenang'>
          <AdminFormControl as='select' className='form-select'>
            {permissionPresets.map(preset => {
              return (
                <option selected={preset.name === accountPermissions?.name}>{preset?.name}</option>
              );
            })}
          </AdminFormControl>
        </AdminFormGroup>
      </Modal.Body>
      <Modal.Footer>
        <CustomButton>Simpan</CustomButton>
        <CustomButton secondary onClick={() => props.setShow(false)}>Batal</CustomButton>
      </Modal.Footer>
    </AdminModal>
  );
};

export default EditAdminAccountModal;