import { useSnackbar } from "notistack";
import { FormCheck, Modal } from "react-bootstrap";
import AdminFormControl from "../../../components/admin-form-control";
import AdminFormGroup from "../../../components/admin-form-group";
import AdminModal from "../../../components/admin-modal";
import CustomButton from "../../../components/custom-button";
import PermissionPreset from "../../../use-cases/permission-preset";
import checkboxIsChecked from '../../../helpers/checkbox-is-checked';
import ValidationRegexes from "../../../helpers/validation-regexes";

const ModalMode = {
  create: 'create',
  edit: 'edit'
}

const CreateEditPermissionPresetModal = ({ presetToEdit, show, setShow, ...props }) => {
  const modalMode = presetToEdit ? ModalMode.edit : ModalMode.create;

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmitCreate = async (event) => {
    event.preventDefault();

    let data = new FormData(event.target);

    let response = await PermissionPreset.createPermissionPreset(
      data.get('name')
    );

    if (response.status === 200) {
      enqueueSnackbar(`Preset wewenang ${data.get('name')} berhasil dibuat.`, {
        variant: 'success'
      });

      setShow(false);
    } else {
      enqueueSnackbar(`Preset wewenang gagal dibuat.`, {
        variant: 'error'
      })
    }
  }

  const handleSubmitEdit = async (event) => {
    event.preventDefault();

    let data = new FormData(event.target);

    const permissionCheckboxNames = {
      canManageAccounts: 'manage-accounts', 
      canManagePermissions: 'manage-permissions',
      canManageMap: 'manage-map',
      canManageShops: 'manage-shops',
      canBackupData: 'backup-data'
    };

    let permissions = {};

    for (let permissionName in permissionCheckboxNames) {
      permissions[permissionName] = checkboxIsChecked(data.get(permissionCheckboxNames[permissionName]));
    }

    let response = await PermissionPreset.updatePermissionPreset(
      data.get('name'),
      permissions
    );

    if (response.status === 200) {
      enqueueSnackbar('Perubahan preset wewenang tersimpan.', {
        variant: 'success'
      })
    } else {
      enqueueSnackbar('Gagal merubah preset wewenang.', {
        variant: 'error'
      })
    }

    setShow(false);
  }

  return (
    <AdminModal show={show} setShow={setShow} {...props}>
      <form method='POST'
        onSubmit={(event) => {
          switch (modalMode) {
            case ModalMode.create:
              handleSubmitCreate(event);
              break;
            case ModalMode.edit:
              handleSubmitEdit(event);
              break;
          }
        }}>
        <Modal.Header>
          <Modal.Title>Ubah Preset Wewenang</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AdminFormGroup label='Nama'>
            <AdminFormControl type='text' name='name'
              readOnly={modalMode === ModalMode.edit} 
              defaultValue={modalMode === ModalMode.edit ? presetToEdit.name : null}
              pattern={ValidationRegexes.alphanumericString}
              minLength={3} maxlength={32}
            />
          </AdminFormGroup>
          { presetToEdit 
            ? <AdminFormGroup label='Wewenang'>
                <FormCheck
                  name='manage-accounts' 
                  label='Dapat mengatur akun' 
                  defaultChecked={presetToEdit.canManageAccounts} 
                />
                <FormCheck 
                  name='manage-permissions' 
                  label='Dapat mengatur wewenang' 
                  defaultChecked={presetToEdit.canManagePermissions} 
                />
                <FormCheck 
                  name='manage-map' 
                  label='Dapat mengatur peta' 
                  defaultChecked={presetToEdit.canManageMap} 
                />
                <FormCheck 
                  name='manage-shops' 
                  label='Dapat mengatur toko beserta dagangannya' 
                  defaultChecked={presetToEdit.canManageShops} 
                />
              </AdminFormGroup>
            : null
          }
        </Modal.Body>
        <Modal.Footer>
          <CustomButton type='submit' onClick={() => {}}>
            {(() => {
              switch (modalMode) {
                case ModalMode.create:
                  return 'Buat';
                case ModalMode.edit:
                  return 'Simpan';
              }
            })()}
          </CustomButton>
          <CustomButton secondary onClick={() => setShow(false)}>Batal</CustomButton>
        </Modal.Footer>
      </form>
    </AdminModal>
  );
};

export default CreateEditPermissionPresetModal;