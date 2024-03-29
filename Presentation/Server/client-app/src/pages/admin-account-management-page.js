import { Form, Nav, Tab, Table } from "react-bootstrap";
import AdminPageContainer from "../components/admin-page-container";
import AdminPageHeader from "../components/admin-page-header";
import AdminPageNav from "../components/admin-page-nav";
import AdminPageNavLink from "../components/admin-page-nav-link";
import AdminPageTabContainer from "../components/admin-page-tab-container";
import AccountIcon from "../svg/account-icon";
import AdminIcon from "../svg/admin-icon";
import AccountsIcon from "../svg/accounts-icon";
import AdminAccountIcon from '../svg/admin-account-icon';
import PlainAccountIcon from '../svg/plain-account-icon';
import VerifiedIcon from '../svg/verified-icon';
import AdminPageTabContent from "../components/admin-page-tab-content";
import AdminFormContainer from '../components/admin-form-container';
import CustomButton from "../components/custom-button";
import AdminFormControl from "../components/admin-form-control";
import { useEffect, useState } from "react";
import fetchAllAdminAccounts from "../use-cases/admin/account-management/fetch-all-admin-accounts";
import styled from "styled-components";
import IconButton from "../components/icon-button";
import EditIcon from '../svg/edit-icon';
import DeleteIcon from '../svg/delete-icon';
import AdminTable from "../components/admin-table";
import FetchAllPermissionPresets from "../use-cases/admin/account-management/fetch-all-permission-presets";
import AccountIdentityTableCell from '../components/account-identity-table-cell';
import fetchAllMerchantAccounts from "../use-cases/admin/account-management/fetch-all-merchant-accounts";
import VerifyMerchantModal from "../modals/verify-merchant-modal";
import EditPermissionPresetModal from "../modals/edit-permission-preset-modal";
import ManipulateItemModal from "../modals/manipulate-item-modal";
import fetchAdminAccountPermissions from "../use-cases/admin/account-management/fetch-admin-account-permissions";
import createAdminAccount from "../use-cases/admin/account-management/create-admin-account";
import deleteAccount from '../use-cases/admin/account-management/delete-account';
import updateAdminAccountPermissions from "../use-cases/admin/account-management/update-admin-account";
import createPermissionPreset from "../use-cases/admin/account-management/create-permission-preset";
import deletePermissionPreset from "../use-cases/admin/account-management/delete-permission-preset";
import fetchMerchantVerificationDetails from "../use-cases/admin/fetch-merchant-verification-details";
import FailSafeImg from "../components/fail-safe-img";

const AdminAccountManagementPage = () => {
  const [adminAccounts, setAdminAccounts] = useState([]);
  const [permissionPresets, setPermissionPresets] = useState([]);
  const [merchantAccounts, setMerchantAccounts] = useState([]);

  const [verifyMerchantModalShow, setVerifyMerchantModalShow] = useState(false);
  const [requestToverify, setRequestToVerify] = useState(null);

  const [editPermissionPresetModalShow, setEditPermissionPresetModalShow] = useState(false);
  const [permissionPresetToEdit, setPermissionPresetToEdit] = useState(null);

  const [query, setQuery] = useState(null);

  useEffect(() => {
    getAllData();
  }, []);

  useEffect(() => {
    if (editPermissionPresetModalShow === false) {
      getAllData();
    }
  }, [editPermissionPresetModalShow]);

  const getAllData = async () => {
    setAdminAccounts(await fetchAllAdminAccounts());
    setPermissionPresets(await FetchAllPermissionPresets());
    setMerchantAccounts(await fetchAllMerchantAccounts());
  };

  const listPermissions = (preset) => {
    let permissions = [];

    if (preset.canManageAccounts) {
      permissions.push('mengatur akun');
    }
    if (preset.canManagePermissions) {
      permissions.push('mengatur wewenang');
    }
    if (preset.canManageMap) {
      permissions.push('mengatur peta');
    }
    if (preset.canManageShops) {
      permissions.push('mengatur toko beserta dagangannya');
    }
    if (preset.canBackupData) {
      permissions.push('mengatur backup dan restorasi database');
    }

    let listString = '';

    if (permissions.length === 0) {
      listString = 'tidak memiliki wewenang';
    } else {
      permissions.forEach((permission, index) => {
        listString += permission;

        if (index !== (permissions.length - 1)) {
          listString += ', ';
        }
      })
    }

    return listString;
  };

  const handleCreateAdminAccount = () => {
    setQuery({
      id: 'create-admin-account',
      title: 'Buat Akun Admin',
      fields: [
        {
          id: 'username',
          label: 'Username',
          type: 'text'
        },
        {
          id: 'email',
          label: 'Email',
          type: 'text'
        },
        {
          id: 'displayName',
          label: 'Nama',
          type: 'text'
        },
        {
          id: 'password',
          label: 'Kata Sandi',
          type: 'text'
        }
      ],
      submit: {
        label: 'Buat',
        callback: async (values) => {
          await createAdminAccount(
            values.username,
            values.email,
            values.displayName,
            values.password
          );

          getAllData();
        }
      }
    })
  };

  const handeEditAdminAccount = async (account) => {
    let permissions = await fetchAdminAccountPermissions(account.id)

    setQuery({
      id: 'edit-admin-account',
      title: 'Edit Akun Admin',
      fields: [
        {
          id: 'id',
          label: 'ID',
          type: 'text',
          readOnly: true,
          defaultValue: account.id
        },
        {
          id: 'name',
          label: 'Nama',
          type: 'text',
          readOnly: true,
          defaultValue: account.displayName
        },
        {
          id: 'preset',
          label: 'Preset Wewenang',
          type: 'select',
          options: permissionPresets.map(preset => {
            return ({
              value: preset.name,
              label: preset.name,
              isDefault: (preset.name === permissions.name)
            });
          })
        }
      ],
      submit: {
        label: 'Simpan',
        callback: async (values) => {
          await updateAdminAccountPermissions(values.id, values.preset);

          await getAllData();
        }
      }
    });
  };

  const handleDeleteAccount = (account) => {
    setQuery({
      id: 'delete-account',
      title: 'Hapus Akun',
      fields: [
        {
          id: 'id',
          label: 'ID',
          type: 'text',
          defaultValue: account.id,
          readOnly: true
        },
        {
          id: 'name',
          label: 'Nama',
          type: 'text',
          defaultValue: account.displayName,
          readOnly: true
        },
        {
          id: 'email',
          label: 'Email',
          type: 'text',
          defaultValue: account.email,
          readOnly: true
        }
      ],
      submit: {
        label: 'Hapus',
        danger: true,
        callback: async (values) => {
          await deleteAccount(values.id);

          await getAllData();
        }
      }
    });
  };

  const handleCreatePermissionPreset = () => {
    setQuery({
      id: 'create-permission-preset',
      title: 'Buat Preset Wewenang Baru',
      fields: [
        {
          id: 'name',
          label: 'Nama Preset',
          type: 'text'
        }
      ],
      submit: {
        label: 'Buat',
        callback: async (values) => {
          await createPermissionPreset(values.name);

          await getAllData();
        }
      }
    })
  };

  const handleVerifyMerchant = async (merchantAccount) => {
    setRequestToVerify(await fetchMerchantVerificationDetails(merchantAccount.id));

    setVerifyMerchantModalShow(true);
  };

  const merchantVerificationCallback = async () => {
    await getAllData();
  };

  const handleEditPermissionPreset = (permissionPreset) => {
    setPermissionPresetToEdit(permissionPreset);

    setEditPermissionPresetModalShow(true);
  };

  const handleDeletePermissionPreset = (permissionPreset) => {
    setQuery({
      id: 'delete-permission-preset',
      title: 'Hapus Preset Wewenang',
      fields: [
        {
          id: 'name',
          label: 'Nama',
          type: 'text',
          defaultValue: permissionPreset.name,
          readOnly: true
        }
      ],
      submit: {
        label: 'Hapus',
        danger: true,
        callback: async (values) => {
          await deletePermissionPreset(values.name);

          await getAllData();
        }
      }
    });
  };

  return (
    <AdminPageContainer>
      <VerifyMerchantModal 
        callback={merchantVerificationCallback}
        show={verifyMerchantModalShow}
        verificationRequest={requestToverify}
        setShow={setVerifyMerchantModalShow} 
      />
      <EditPermissionPresetModal 
        show={editPermissionPresetModalShow}
        permissionPreset={permissionPresetToEdit}
        setShow={setEditPermissionPresetModalShow}
      />
      <ManipulateItemModal 
        query={query}
      />
      <AdminPageHeader title='Manajemen Akun'>
        <AccountsIcon />
      </AdminPageHeader>
      <AdminPageTabContainer defaultActiveKey='admin-accounts'>
        <AdminPageNav>
          <Nav.Item>
            <AdminPageNavLink eventKey='admin-accounts'>
              <AdminAccountIcon />
              <p>Admin</p>
            </AdminPageNavLink>
          </Nav.Item>
          <Nav.Item>
            <AdminPageNavLink eventKey='merchant-accounts'>
              <PlainAccountIcon />
              <p>Pedagang</p>
            </AdminPageNavLink>
          </Nav.Item>
        </AdminPageNav>
        <AdminPageTabContent>
          <Tab.Pane eventKey='admin-accounts'>
            <AdminFormContainer>
              <h1 className='mb-3'>Manajemen Akun Admin</h1>
              <div className='d-flex flex-row mb-3 align-items-center flex-wrap justify-content-end'>
                <AdminFormControl type='text' placeholder='Cari akun' className='mb-1' style={{maxWidth: '16rem'}} />
                <div className='flex-grow-1' />
                <CustomButton className='mb-1' onClick={() => handleCreateAdminAccount()}>Akun baru</CustomButton>
              </div>
              <AdminTable>
                <thead>
                  <tr>
                    <th>Identitas</th>
                    <th>Preset Wewenang</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {adminAccounts.map(account => {
                    return (
                      <tr>
                        <AccountIdentityTableCell>
                          <FailSafeImg className='profile-picture'
                            src={`/api/accounts/${account.id}/profile-picture`}
                            altsrc='/admin-assets/no-profile-picture.png'
                          />
                          <div>
                            <p>{account.displayName}</p>
                            <p className='account-id'>{account.id}</p>
                          </div>
                        </AccountIdentityTableCell>
                        <td>{account.permissionPresetName}</td>
                        <td>
                          <span className='d-flex justify-content-end'>
                            <IconButton className='p-1 mr-2' iconOnly
                              onClick={() => handeEditAdminAccount(account)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton className='p-1' iconOnly danger
                              onClick={() => handleDeleteAccount(account)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </AdminTable>
            </AdminFormContainer>
            <AdminFormContainer>
              <h1 className='mb-3'>Pengaturan Wewenang</h1>
              <div className='mb-3'>
                <CustomButton onClick={() => handleCreatePermissionPreset()}>Preset wewenang baru</CustomButton>
              </div>
              <AdminTable>
                <thead>
                  <tr>
                    <th>Nama preset</th>
                    <th>Wewenang</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {permissionPresets.map(preset => {
                    return (
                      <tr>
                        <td className='text-nowrap'>{preset.name}</td>
                        <td style={{maxWidth: '24rem'}}>{listPermissions(preset)}</td>
                        <td>
                          <span className='d-flex justify-content-end'>
                            <IconButton className='p-1 mr-2' iconOnly
                              onClick={() => handleEditPermissionPreset(preset)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton className='p-1' iconOnly danger
                              onClick={() => handleDeletePermissionPreset(preset)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </AdminTable>
            </AdminFormContainer>
          </Tab.Pane>
          <Tab.Pane eventKey='merchant-accounts'>
            <AdminFormContainer>
              <h1 className='mb-3'>Manajemen Akun Pedagang</h1>
              <AdminFormControl type='text' placeholder='Cari akun' className='mb-3' style={{maxWidth: '16rem'}} />
              <AdminTable>
                <thead>
                  <tr>
                    <th>Identitas</th>
                    <th>Toko</th>
                    <th>Status Verifikasi</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {merchantAccounts.map(account => {
                    return (
                      <tr>
                        <AccountIdentityTableCell>
                          <FailSafeImg className='profile-picture'
                            src={`/api/accounts/${account.id}/profile-picture`}
                            altsrc='/admin-assets/no-profile-picture.png'
                          />
                          <div>
                            <div className='d-flex flex-row align-items-center'>
                              <p className='mr-1'>{account.displayName}</p>
                              {account.verified ? <VerifiedIcon style={{width: '1em', height: '1em'}} /> : null}
                            </div>
                            <p className='account-id'>{account.id}</p>
                          </div>
                        </AccountIdentityTableCell>
                        <td>
                          {(() => {
                            if (account.ownedShops.length === 0) {
                              return "Pedagang tidak memiliki toko."
                            }

                            let shopList = "";

                            account.ownedShops.forEach((shop, index) => {
                              shopList += shop.name;

                              if ((index + 1) < account.ownedShops.length) {
                                shopList += ", ";
                              }
                            })

                            return shopList;
                          })()}
                        </td>
                        <td>
                          {account.verified ? 'Sudah diverifikasi' : 'Belum diverifikasi'}
                        </td>
                        <td>
                          <span className='d-flex justify-content-end'>
                            {
                              (account.verified === false) ? 
                                <IconButton className='p-1 mr-2' iconOnly
                                  onClick={() => handleVerifyMerchant(account)}
                                >
                                  <VerifiedIcon />
                                </IconButton>
                              : null
                            }
                            <IconButton className='p-1' iconOnly danger
                              onClick={() => handleDeleteAccount(account)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </AdminTable>
            </AdminFormContainer>
          </Tab.Pane>
        </AdminPageTabContent>
      </AdminPageTabContainer>
    </AdminPageContainer>
  );
};

export default AdminAccountManagementPage;