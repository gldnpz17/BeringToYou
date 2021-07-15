import { Form, Nav, Tab } from "react-bootstrap";
import styled from "styled-components";
import AdminPageHeader from "../components/admin-page-header";
import CustomButton from "../components/custom-button";
import AccountIcon from "../svg/account-icon";
import ProfileIcon from '../svg/profile-icon';
import SecurityIcon from '../svg/security-icon';
import responsiveBreakpoints from '../helpers/responsive-breakpoints';
import AdminFormContainer from '../components/admin-form-container';
import AdminPageNavLink from "../components/admin-page-nav-link";
import AdminPageNav from "../components/admin-page-nav";
import AdminPageContainer from '../components/admin-page-container';
import AdminPageTabContainer from '../components/admin-page-tab-container';
import AdminPagetabContent from '../components/admin-page-tab-content';
import VerifiedIcon from "../svg/verified-icon";
import { useContext, useEffect, useState } from "react";
import ManipulateItemModal from "../modals/manipulate-item-modal";
import fetchAllShops from '../use-cases/common/fetch-all-shops';
import addShopToMerchantVerification from "../use-cases/admin/account/add-shop-to-merchant-verification";
import { IdentityContext } from "../app";
import AdminTable from "../components/admin-table";
import fetchMerchantVerificationShops from "../use-cases/admin/fetch-merchant-verification-shops";
import ItemWithIdTableCell from "../components/item-with-id-table-cell";
import IconButton from "../components/icon-button";
import DeleteIcon from "../svg/delete-icon";
import deleteShopFromMerchantVerification from "../use-cases/admin/account/delete-shop-from-merchant-verification";
import uploadImage from '../use-cases/common/upload-image';
import ImageListControl from "../components/image-list-control";
import addMerchantVerificationImage from '../use-cases/admin/account/add-merchant-verification-image';
import deleteMerchantVerificationImage from '../use-cases/admin/account/delete-merchant-verification-image';
import fetchMerchantVerificationDetails from '../use-cases/admin/fetch-merchant-verification-details';

const AdminAccountPage = () => {
  const identityContext = useContext(IdentityContext)

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
    
    if (identityContext !== undefined && identityContext.identity !== undefined) {
      setOwnedShops(await fetchMerchantVerificationShops(identityContext.identity.accountId));
    }
    
    if (identityContext?.identity.isMerchant) {
      let request = await fetchMerchantVerificationDetails(identityContext.identity.accountId);

      setVerificationRequest(request)

      let urls = request?.verificationPhotoFilenames.map(filename => `/api/merchant/verification-requests/${identityContext.identity.accountId}/photos/${filename}`);

      setVerificationImages(urls);
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
          <Nav.Item>
            <AdminPageNavLink eventKey='verification'>
              <VerifiedIcon />
              <p>Verifikasi</p>
            </AdminPageNavLink>
          </Nav.Item>
        </AdminPageNav>
        <AdminPagetabContent>
          <Tab.Pane eventKey='profile'>
            <AdminFormContainer>
              <h1 className='mb-3'>Informasi Diri</h1>
              <Form className='mb-3'>
                <Form.Group>
                  <Form.Label>Foto profil</Form.Label>
                  <Form.Control className='w-100' type='file' onChange={handleUpdateProfilePicture} />
                </Form.Group>
              </Form>
              <Form>
                <Form.Group className='mb-2'>
                  <Form.Label>Nama</Form.Label>
                  <Form.Control type='text' />
                </Form.Group>
                <CustomButton>Ubah</CustomButton>
              </Form>
            </AdminFormContainer>
          </Tab.Pane>
          <Tab.Pane eventKey='security'>
            <AdminFormContainer>
              <h1 className='mb-3'>Kata Sandi</h1>
              <Form className='mb-3'>
                <Form.Group className='mb-2'>
                  <Form.Label>Ubah kata sandi</Form.Label>
                  <Form.Control className='mb-1' type='text' placeholder='Kode' />
                  <Form.Control type='text' placeholder='Kata sandi baru' />
                </Form.Group>
                <CustomButton className='mr-2'>Ubah</CustomButton>
                <CustomButton secondary={true}>Kirim Kode</CustomButton>
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
            <AdminFormContainer>
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
            <AdminFormContainer>
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