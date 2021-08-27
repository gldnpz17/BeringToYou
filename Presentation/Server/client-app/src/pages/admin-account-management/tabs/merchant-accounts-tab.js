import { DataGrid, GridToolbar } from "@material-ui/data-grid";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Tab } from "react-bootstrap";
import AdminFormContainer from "../../../components/admin-form-container";
import IconButton from "../../../components/icon-button";
import DeleteIcon from "../../../svg/delete-icon";
import VerifiedIcon from "../../../svg/verified-icon";
import AccountManagement from "../../../use-cases/account-management";
import setActiveModal from "../../common/utils/set-active-modal";
import VerifyMerchantModal from '../modals/verify-merchant-modal';
import FailSafeImg from '../../../components/fail-safe-img';

const Modals = {
  verifyMerchant: 'verify-merchant'
}

const MerchantAccountsTab = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [openModal, setOpenModal] = useState(null);

  const setShowModal = setActiveModal(setOpenModal);

  const [merchantAccounts, setMerchantAccounts] = useState([]);

  useEffect(() => {
    if (!openModal) {
      loadData();
    }
  }, [openModal]);

  const loadData = async () => {
    setMerchantAccounts(await AccountManagement.readAllMerchantAccounts());
  }

  const [requestToverify, setRequestToVerify] = useState(null);
  const handleVerifyMerchant = async (merchantAccount) => {
    setRequestToVerify(await AccountManagement.readMerchantVerificationRequest(merchantAccount.id));

    setOpenModal(Modals.verifyMerchant);
  };

  const handleDeleteAccount = async (account) => {
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
  };

  return (
    <Tab.Pane eventKey='merchant-accounts'>
      <VerifyMerchantModal
        show={openModal === Modals.verifyMerchant}
        verificationRequest={requestToverify}
        setShow={setShowModal(Modals.verifyMerchant)}
      />
      <AdminFormContainer>
        <h1 className='mb-3'>Manajemen Akun Pedagang</h1>
        <div style={{ height: '600px' }}>
          <DataGrid
            disableSelectionOnClick={true}
            components={{
              Toolbar: GridToolbar
            }}
            columns={[
              {
                field: 'profilePicture',
                headerName: 'Foto',
                disableExport: true,
                disableReorder: true,
                sortable: false,
                align: 'center',
                renderCell: params => (
                  <FailSafeImg
                    className='h-100 p-1 rounded-circle' 
                    src={`/api/accounts/${params.row.id}/profile-picture`}
                    altsrc='/admin-assets/no-profile-picture.png'
                  />
                )
              },
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
                field: 'ownedShops',
                headerName: 'Toko',
                minWidth: 200,
                flex: 1,
                valueFormatter: params => {
                  if (params.value.length === 0) {
                    return "Pedagang tidak memiliki toko."
                  }

                  let shopNames = params.value.map(shop => shop.name).join(', ')

                  return shopNames;
                }
              },
              {
                field: 'verified',
                headerName: 'Status Verifikasi',
                minWidth: 200,
                flex: 1,
                valueFormatter: params => (
                  params.value ? 'Sudah diverifikasi' : 'Belum diverifikasi'
                )
              },
              {
                field: 'actions',
                headerName: 'Aksi',
                disableExport: true,
                disableColumnMenu: true,
                sortable: false,
                renderCell: params => (
                  <div>
                    {
                      (params.row.verified === false) ?
                        <IconButton className='p-1 mr-2' iconOnly
                          onClick={() => handleVerifyMerchant(params.row)}
                        >
                          <VerifiedIcon />
                        </IconButton>
                        : null
                    }
                    <IconButton className='p-1' iconOnly danger
                      onClick={() => handleDeleteAccount(params.row)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                )
              }
            ]}
            rows={merchantAccounts}
          />
        </div>
      </AdminFormContainer>
    </Tab.Pane>
  );
}

export default MerchantAccountsTab;