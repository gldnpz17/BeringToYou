import { useContext, useEffect, useState } from "react";
import { Form, Nav, Tab } from "react-bootstrap";
import { IdentityContext } from "../app";
import AdminFormContainer from '../components/admin-form-container';
import AdminFormControl from "../components/admin-form-control";
import AdminPageContainer from '../components/admin-page-container';
import AdminPageHeader from "../components/admin-page-header";
import AdminPageNav from "../components/admin-page-nav";
import AdminPageNavLink from "../components/admin-page-nav-link";
import AdminPageTabContainer from '../components/admin-page-tab-container';
import AdminPagetabContent from '../components/admin-page-tab-content';
import AdminTable from "../components/admin-table";
import CustomButton from "../components/custom-button";
import IconButton from "../components/icon-button";
import ImageListControl from "../components/image-list-control";
import ItemWithIdTableCell from "../components/item-with-id-table-cell";
import ManipulateItemModal from "../modals/manipulate-item-modal";
import AccountIcon from "../svg/account-icon";
import DeleteIcon from "../svg/delete-icon";
import ProfileIcon from '../svg/profile-icon';
import SecurityIcon from '../svg/security-icon';
import VerifiedIcon from "../svg/verified-icon";
import addMerchantVerificationImage from '../use-cases/admin/account/add-merchant-verification-image';
import addShopToMerchantVerification from "../use-cases/admin/account/add-shop-to-merchant-verification";
import deleteMerchantVerificationImage from '../use-cases/admin/account/delete-merchant-verification-image';
import deleteShopFromMerchantVerification from "../use-cases/admin/account/delete-shop-from-merchant-verification";
import updateProfile from "../use-cases/admin/account/update-profile";
import fetchMerchantVerificationDetails from '../use-cases/admin/fetch-merchant-verification-details';
import fetchMerchantVerificationShops from "../use-cases/admin/fetch-merchant-verification-shops";
import resetPassword from "../use-cases/admin/reset-password";
import fetchAllShops from '../use-cases/common/fetch-all-shops';
import uploadImage from '../use-cases/common/upload-image';

const AdminAccountPage = () => {
  const identityContext = useContext(IdentityContext);

  const [query, setQuery] = useState(null);

  const [shops, setShops] = useState([]);

  const [ownedShops, setOwnedShops] = useState([]);

  const [verificationImages, setVerificationImages] = useState([]);

  const [verificationRequest, setVerificationRequest] = useState(null);

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = async () => {
    setShops(await fetchAllShops());

    if (identityContext?.identity?.isMerchant) {
      let request = await fetchMerchantVerificationDetails(identityContext.identity.accountId);

      setVerificationRequest(request)

      let urls = request?.verificationPhotoFilenames.map(filename => `/api/merchant/verification-requests/${identityContext.identity.accountId}/photos/${filename}`);

      setVerificationImages(urls);

      if (request.accepted) {
        setOwnedShops(request.ownedShops);
      } else {
        setOwnedShops(await fetchMerchantVerificationShops(identityContext.identity.accountId));
      }
    }
  }

  const handleUpdateProfilePicture = async (event) => {
    let fileToUpload = event.target.files[0];

    let result = await uploadImage(
      `/api/accounts/${identityContext.identity.accountId}/profile-picture`,
      'profile-picture',
      fileToUpload,
      'POST');

    if (result.status === 200) {
      window.location.reload();
    }
  };

  const handleUpdateProfile = async () => {
    let username = document.getElementById('account-profile-form-username').value;
    let displayName = document.getElementById('account-profile-form-display-name').value;
    let email = document.getElementById('account-profile-form-email').value;

    let response = await updateProfile(
      identityContext?.identity?.accountId,
      username,
      displayName,
      email);

    if (response.status === 200) {
      window.location.reload();
    }
  };

  const handleResetPassword = async () => {
    let newPassword = document.getElementById('account-page-reset-password').value;

    if (newPassword) {
      let response = await resetPassword(identityContext?.identity?.accountId, newPassword);

      if (response.status === 200) {
        document.getElementById('account-page-reset-password').value = '';
        alert('Perubahan kata sandi berhasil.');
      }
    }
  }

  const handleAddShop = (identity) => {
    setQuery({
      id: 'add-shop-to-verification-request',
      title: 'Tambahkan Toko',
      fields: [
        {
          id: 'shop',
          label: 'Toko',
          type: 'select',
          options: shops.map(shop => {
            return ({
              value: shop.id,
              label: shop.name,
              isDefault: false
            });
          })
        }
      ],
      submit: {
        label: 'Tambahkan',
        callback: async (values) => {
          await addShopToMerchantVerification(identityContext.identity.accountId, values.shop);

          await getAllData();
        }
      }
    });
  };

  const handleRemoveShop = async (shopId) => {
    await deleteShopFromMerchantVerification(identityContext.identity.accountId, shopId);

    await getAllData();
  };

  return (
    <AdminPageContainer>
      <ManipulateItemModal
        query={query}
      />
      <AdminPageHeader title='Akun Pribadi'>
        <AccountIcon />
      </AdminPageHeader>
      <AdminPageTabContainer defaultActiveKey='profile'>
        <AdminPageNav>
          <Nav.Item>
            <AdminPageNavLink eventKey='profile'>
              <ProfileIcon />
              <p>Profil</p>
            </AdminPageNavLink>
          </Nav.Item>
          <Nav.Item>
            <AdminPageNavLink eventKey='security'>
              <SecurityIcon />
              <p>Keamanan</p>
            </AdminPageNavLink>
          </Nav.Item>
          {identityContext?.identity?.isMerchant ?
            <Nav.Item>
              <AdminPageNavLink eventKey='verification'>
                <VerifiedIcon />
                <p>Verifikasi</p>
              </AdminPageNavLink>
            </Nav.Item>
            : null}
        </AdminPageNav>
        <AdminPagetabContent>
          <Tab.Pane eventKey='profile'>
            <AdminFormContainer>
              <Form>
                <Form.Group className='mb-3'>
                  <Form.Label>Username</Form.Label>
                  <AdminFormControl type='text'
                    id='account-profile-form-username'
                    defaultValue={identityContext?.identity?.username}
                    className='mr-2'
                  />
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>Nama Lengkap</Form.Label>
                  <AdminFormControl type='text'
                    id='account-profile-form-display-name'
                    defaultValue={identityContext?.identity?.displayName}
                    className='mr-2'
                  />
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>Alamat E-Mail</Form.Label>
                  <AdminFormControl type='text'
                    id='account-profile-form-email'
                    defaultValue={identityContext?.identity?.email}
                    className='mr-2'
                  />
                </Form.Group>
                <CustomButton onClick={handleUpdateProfile}>Ubah</CustomButton>
              </Form>
            </AdminFormContainer>
            <AdminFormContainer>
              <Form className='mb-3'>
                <Form.Group>
                  <Form.Label>Foto profil</Form.Label>
                  <Form.Control className='w-100' type='file' onChange={handleUpdateProfilePicture} />
                </Form.Group>
              </Form>
            </AdminFormContainer>
          </Tab.Pane>
          <Tab.Pane eventKey='security'>
            <AdminFormContainer>
              <h1 className='mb-3'>Kata Sandi</h1>
              <Form className='mb-3'>
                <Form.Group className='mb-2'>
                  <Form.Label>Ubah kata sandi</Form.Label>
                  <div className='d-flex'>
                    <AdminFormControl id='account-page-reset-password' type='password' placeholder='Kata sandi baru' />
                    <CustomButton className='ml-2' onClick={() => handleResetPassword()}>Ubah</CustomButton>
                  </div>
                </Form.Group>
              </Form>
            </AdminFormContainer>
            <AdminFormContainer>
              <h1 className='mb-3'>Autentikasi 2 Faktor</h1>
              <Form className='mb-3'>
                <Form.Group className='d-flex flex-column align-items-start'>
                  <Form.Label>Time-based One-Time Password</Form.Label>
                  <CustomButton className='mr-2'>Atur TOTP</CustomButton>
                </Form.Group>
              </Form>
              <Form>
                <Form.Group className='d-flex flex-column align-items-start'>
                  <Form.Label>Backup Code</Form.Label>
                  <CustomButton aria-disabled='true' className='mr-2'>Lihat backup code</CustomButton>
                </Form.Group>
              </Form>
            </AdminFormContainer>
          </Tab.Pane>
          <Tab.Pane eventKey='verification'>
            <AdminFormContainer>
              <h1 className='mb-3'>Status Verifikasi</h1>
              <p><b>Status: </b>{verificationRequest?.accepted ? 'Sudah diverifikasi' : 'Belum diverifikasi'}</p>
            </AdminFormContainer>
            <AdminFormContainer disabled={verificationRequest?.accepted} disabledReason='Sudah diverifikasi'>
              <h1 className='mb-3'>Kepemilikan Toko</h1>
              <CustomButton className='mb-3' onClick={() => handleAddShop()}>Tambah toko</CustomButton>
              <AdminTable>
                <thead>
                  <tr>
                    <th>Toko</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {ownedShops?.map(shop => {
                    return (
                      <tr>
                        <ItemWithIdTableCell>
                          <div>
                            <p>{shop.name}</p>
                            <p className='id'>{shop.id}</p>
                          </div>
                        </ItemWithIdTableCell>
                        <td>
                          <span className='d-flex justify-content-end'>
                            <IconButton className='p-1 mr-2' iconOnly
                              onClick={() => handleRemoveShop(shop.id)} danger={true}
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
            <AdminFormContainer disabled={verificationRequest?.accepted} disabledReason='Sudah diverifikasi'>
              <h1 className='mb-3'>Foto Verifikasi</h1>
              <ImageListControl
                images={verificationImages}
                loadImages={getAllData}
                onUpload={(file) => addMerchantVerificationImage(identityContext.identity.accountId, file)}
                onRemove={(filename) => deleteMerchantVerificationImage(identityContext.identity.accountId, filename)}
              />
            </AdminFormContainer>
          </Tab.Pane>
        </AdminPagetabContent>
      </AdminPageTabContainer>
    </AdminPageContainer>
  );
};

export default AdminAccountPage;