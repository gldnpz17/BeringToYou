import { useEffect, useState } from "react";
import { Tab } from "react-bootstrap";
import AdminFormContainer from "../../../components/admin-form-container";
import CustomButton from "../../../components/custom-button";
import IconButton from "../../../components/icon-button";
import DeleteIcon from "../../../svg/delete-icon";
import EditIcon from "../../../svg/edit-icon";
import setActiveModal from "../../common/utils/set-active-modal";
import CreateAdminAccountModal from "../modals/create-admin-account-modal";
import EditAdminAccountPermissionModal from "../modals/edit-admin-account-permission-modal";
import AccountManagement from "../../../use-cases/account-management";
import CreateEditPermissionPresetModal from "../modals/create-edit-permission-preset-modal";
import PermissionPreset from "../../../use-cases/permission-preset";
import { useSnackbar } from "notistack";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";
import SecurityIcon from '../../../svg/security-icon';

const Modals = {
  createAdminAccount: 'create-admin-account',
  editAdminAccount: 'edit-admin-account',
  createEditPermissionPreset: 'create-edit-permission-preset'
}

const AdminAccountsTab = (props) => {
  const { enqueueSnackbar } = useSnackbar();

  const [openModal, setOpenModal] = useState(null);
  const setShowModal = setActiveModal(setOpenModal);

  const [adminAccounts, setAdminAccounts] = useState([]);
  const [permissionPresets, setPermissionPresets] = useState([]);

  useEffect(() => {
    if (!openModal) {
      loadData();
    }
  }, [openModal])

  const loadData = async () => {
    setAdminAccounts(await AccountManagement.readAllAdminAccounts())
    setPermissionPresets(await PermissionPreset.readAllPermissionPresets());
  }

  const handleCreateAdminAccount = () => {
    setOpenModal(Modals.createAdminAccount);
  }

  const [adminAccountToEdit, setAdminAccountToEdit] = useState(null);
  const handleEditAdminAccount = (account) => {
    setOpenModal(Modals.editAdminAccount);
    setAdminAccountToEdit(account);
  }

  const handleDeleteAdminAccount = async (account) => {
    if (window.confirm(`Hapus akun ${account.displayName}?`)) {
      let response = await AccountManagement.deleteAccount(account.id);

      if (response.status === 200) {
        enqueueSnackbar(`Akun ${account.displayName} berhasil terhapus.`, {
          variant: 'success'
        });

        await loadData();
      } else {
        enqueueSnackbar(`Akun gagal dihapus.`, {
          variant: 'error'
        });
      }
    }
  }

  const handleCreatePermissionPreset = () => {
    setPermissionPresetToEdit(null);
    setOpenModal(Modals.createEditPermissionPreset);
  }

  const [permissionPresetToEdit, setPermissionPresetToEdit] = useState(null);
  const handleEditPermissionPreset = (permissionPreset) => {
    setPermissionPresetToEdit(permissionPreset);
    setOpenModal(Modals.createEditPermissionPreset);
  }

  const handleDeletePermissionPreset = async (permissionPreset) => {
    if (window.confirm(`Hapus preset ${permissionPreset.name}?`)) {
      let response = await PermissionPreset.deletePermissionPreset(permissionPreset.name);

      if (response.status === 200) {
        enqueueSnackbar('Preset wewenang berhasil dihapus.', {
          variant: 'success'
        });

        await loadData();
      } else {
        enqueueSnackbar('Preset wewenang gagal dihapus.', {
          variant: 'error'
        })
      }
    }
  }

  return (
    <Tab.Pane eventKey='admin-accounts'>
      <CreateAdminAccountModal 
        show={openModal === Modals.createAdminAccount}
        setShow={setShowModal(Modals.createAdminAccount)}
      />
      <EditAdminAccountPermissionModal 
        show={openModal === Modals.editAdminAccount}
        setShow={setShowModal(Modals.editAdminAccount)}
        accountToEdit={adminAccountToEdit}
      />
      <CreateEditPermissionPresetModal
        show={openModal === Modals.createEditPermissionPreset}
        setShow={setShowModal(Modals.createEditPermissionPreset)}
        presetToEdit={permissionPresetToEdit}
      />
      <AdminFormContainer>
        <h1 className='mb-3'>Manajemen Akun Admin</h1>
        <div className='mb-3' style={{ height: '400px' }}>
          <DataGrid
            disableSelectionOnClick={true}
            components={{
              Toolbar: GridToolbar
            }}
            columns={[
              {
                field: 'username',
                headerName: 'Username',
                minWidth: 200,
                flex: 1
              },
              {
                field: 'displayName',
                headerName: 'Nama Lengkap',
                minWidth: 200,
                flex: 1
              },
              {
                field: 'permissionPresetName',
                headerName: 'Wewenang',
                minWidth: 200,
                flex: 1
              },
              {
                field: 'actions',
                headerName: 'Aksi',
                disableExport: true,
                disableColumnMenu: true,
                sortable: false,
                renderCell: params => (
                  <span className='d-flex justify-content-end'>
                    <IconButton className='p-1 mr-2' iconOnly
                      onClick={() => handleEditAdminAccount(params.row)}
                    >
                      <SecurityIcon />
                    </IconButton>
                    <IconButton className='p-1' iconOnly danger
                      onClick={() => handleDeleteAdminAccount(params.row)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </span>
                )
              }
            ]}
            rows={adminAccounts}
          />
        </div>
        <div className='d-flex flex-row align-items-center flex-wrap justify-content-end'>
          <CustomButton className='mb-1' onClick={() => handleCreateAdminAccount()}>Akun baru</CustomButton>
        </div>
      </AdminFormContainer>
      <AdminFormContainer>
        <h1 className='mb-3'>Pengaturan Wewenang</h1>
        <div className='mb-3' style={{ height: '400px' }}>
          <DataGrid
            disableSelectionOnClick={true}
            columns={[
              {
                field: 'name',
                headerName: 'Nama Preset',
                minWidth: 200,
                flex: 1
              },
              {
                field: 'canManageAccounts',
                headerName: 'Akun',
                minWidth: 125,
                type: 'boolean',
                disableColumnMenu: true,
                sortable: false
              },
              {
                field: 'canManagePermissions',
                headerName: 'Wewenang',
                minWidth: 125,
                type: 'boolean',
                disableColumnMenu: true,
                sortable: false
              },
              {
                field: 'canManageMap',
                headerName: 'Peta',
                minWidth: 125,
                type: 'boolean',
                disableColumnMenu: true,
                sortable: false
              },
              {
                field: 'canManageShops',
                headerName: 'Toko',
                minWidth: 125,
                type: 'boolean',
                disableColumnMenu: true,
                sortable: false
              },
              {
                field: 'actions',
                headerName: 'Aksi',
                disableExport: true,
                disableColumnMenu: true,
                sortable: false,
                renderCell: params => (
                  <span className='d-flex justify-content-end'>
                    <IconButton className='p-1 mr-2' iconOnly
                      onClick={() => handleEditPermissionPreset(params.row)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton className='p-1' iconOnly danger
                      onClick={() => handleDeletePermissionPreset(params.row)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </span>
                )
              }
            ]}
            rows={permissionPresets.map((preset) => {
              return ({
                id: preset.name,
                ...preset
              });
            })}
          />
        </div>
        <div className='mb-3 d-flex justify-content-end'>
          <CustomButton onClick={() => handleCreatePermissionPreset()}>Preset wewenang baru</CustomButton>
        </div>
      </AdminFormContainer>
    </Tab.Pane>
  );
}

export default AdminAccountsTab;