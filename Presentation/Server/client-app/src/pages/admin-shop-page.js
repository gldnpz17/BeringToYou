import { useEffect, useRef, useState } from "react";
import React from 'react';
import AdminPageContainer from "../components/admin-page-container";
import AdminPageHeader from "../components/admin-page-header";
import AdminPageNav from "../components/admin-page-nav";
import AdminPageTabContainer from "../components/admin-page-tab-container";
import ManipulateItemModal from "../modals/manipulate-item-modal";
import ShopIcon from "../svg/shop-icon";
import ProductIcon from '../svg/product-icon';
import ViewIcon from '../svg/view-icon';
import CogsIcon from '../svg/cogs-icon';
import { Nav, Tab, Form } from 'react-bootstrap';
import AdminPageNavLink from "../components/admin-page-nav-link";
import AdminPageTabContent from "../components/admin-page-tab-content";
import AdminFormControl from "../components/admin-form-control";
import styled from "styled-components";
import fetchAllShops from '../use-cases/common/fetch-all-shops';
import CustomButton from "../components/custom-button";
import AdminFormContainer from "../components/admin-form-container";
import AdminTable from "../components/admin-table";
import fetchOnlineShops from '../use-cases/common/fetch-online-shops';
import ItemWithIdTableCell from "../components/item-with-id-table-cell";
import IconButton from "../components/icon-button";
import EditIcon from "../svg/edit-icon";
import DeleteIcon from "../svg/delete-icon";
import fetchShopProducts from "../use-cases/common/fetch-shop-products";
import fetchAllShopCategories from "../use-cases/common/fetch-all-shop-categories";
import fetchAllProductCategories from "../use-cases/common/fetch-all-product-categories";
import fetchAllOnlineShopPlatforms from '../use-cases/common/fetch-all-online-shop-platforms';
import ImageListControl from "../components/image-list-control";
import createShopCategory from '../use-cases/admin/shop/create-shop-category';
import updateShopCategory from '../use-cases/admin/shop/update-shop-category';
import deleteShopCategory from '../use-cases/admin/shop/delete-shop-category';
import createProductCategory from '../use-cases/admin/shop/create-product-category';
import updateProductCategory from '../use-cases/admin/shop/update-shop-category';
import deleteProductCategory from '../use-cases/admin/shop/delete-product-category';
import createOnlineShopPlatform from '../use-cases/admin/shop/create-online-shop-platform';
import updateOnlineShopPlatform from '../use-cases/admin/shop/update-online-shop-platform';
import deleteOnlineShopPlatform from '../use-cases/admin/shop/delete-online-shop-platform';
import uploadFile from "../use-cases/common/upload-file";
import FailSafeImg from "../components/fail-safe-img";
import updateShop from "../use-cases/admin/map/update-shop";
import createOnlineShop from "../use-cases/admin/shop/create-online-shop";
import editOnlineShop from '../use-cases/admin/shop/edit-online-shop';
import deleteOnlineShop from '../use-cases/admin/shop/delete-online-shop';

const StoreSelectContainer = styled.div`
  max-width: 28rem;
  max-height: 3rem;
  transition: max-width 0.5s 0.6s, opacity 0.5s 0.6s, max-height 0.5s, margin-bottom 0.5s;

  &.hidden {
    transition: max-width 0.5s, opacity 0.5s, max-height 0.5s 0.6s, margin-bottom 0.5s 0.6s; 

    opacity: 0%;
    max-width: 0rem;
    max-height: 0rem;
    margin-bottom: 0 !important;
  }
`;

const ShopBanner = styled(FailSafeImg)`
  max-height: 15rem;
  max-width: 100%;
`;

const AdminShopPage = () => {
  const bannerUploadInput = useRef(null);

  const [shops, setShops] = useState([]); 
  const [selectedShop, setSelectedShop] = useState(null);

  const [onlineShops, setOnlineShops] = useState([]);
  const [products, setProducts] = useState([]);

  const [shopCategories, setShopCategories] = useState([]);
  const [productCategories, setProductCategories] = useState([]);
  const [onlineShopPlatforms, setOnlineShopPlatforms] = useState([]);

  const [tabActiveKey, setTabActiveKey] = useState('shop-profile');

  const [canSubmitProfileEdits, setCanSubmitProfileEdits] = useState(false);
  const [bannerImageToUpload, setBannerImageToUpload] = useState(null);

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = async () => {
    setShops(await fetchAllShops());
    setShopCategories(await fetchAllShopCategories());
    setProductCategories(await fetchAllProductCategories());
    setOnlineShopPlatforms(await fetchAllOnlineShopPlatforms());
  };

  useEffect(() => {
    refreshShopData(selectedShop?.id);
  }, [selectedShop])

  const refreshShopData = async (shopId) => {
    let bannerImage = document.getElementById('shop-banner-image');
    bannerImage.src = `/api/public/assets/${selectedShop?.bannerImage?.thumbnailFilename}`;

    document.getElementById('shop-profile-name').defaultValue = selectedShop?.name ?? "";
    document.getElementById('shop-profile-description').defaultValue = selectedShop?.description ?? "";

    setOnlineShops(await fetchOnlineShops(shopId));
    setProducts(await fetchShopProducts(shopId));

    setBannerImageToUpload(null);
  };

  const selectShop = (shopId) => {
    let shop = shops.find(shop => shop.id === shopId);

    setSelectedShop(shop);
  } 

  const [query, setQuery] = useState(null);

  const handleSubmitShopProfileEdits = async () => {
    let newName = document.getElementById('shop-profile-name').value;
    let newDescription = document.getElementById('shop-profile-description').value;
    
    await updateShop(
      selectedShop.id,
      newName,
      newDescription,
      selectedShop.floor,
      selectedShop.latitude,
      selectedShop.longitude,
      selectedShop.category.id);

    if (bannerImageToUpload !== null || bannerImageToUpload !== undefined) {
      await uploadFile(
        `/api/shops/${selectedShop.id}/banner-image`,
        'image',
        bannerImageToUpload,
        bannerImageToUpload.filename,
        'PUT'
      );
    }

    window.location.reload();
  };

  const handleSetBannerImage = async () => {
    let file = bannerUploadInput.current.files[0];
    setBannerImageToUpload(file);

    let bannerImage = document.getElementById('shop-banner-image');
    bannerImage.src = URL.createObjectURL(file);

    bannerUploadInput.current.value = null;

    setCanSubmitProfileEdits(true);
  }

  const handleAddOnlineShop = () => {
    setQuery({
      id: 'add-online-shop',
      title: 'Tambah Toko Online',
      fields: [
        {
          id: 'platform',
          label: 'Platform',
          type: 'select',
          options: onlineShopPlatforms.map(platform => {
            return (
              {
                value: platform.id,
                label: platform.name,
                isDefault: false
              }
            );
          })
        }, 
        {
          id: 'name',
          label: 'Nama Toko',
          type: 'text'
        },
        {
          id: 'url',
          label: 'URL',
          type: 'text'
        }
      ],
      submit: {
        label: 'Tambahkan',
        callback: async (values) => {
          await createOnlineShop(
            selectedShop.id,
            values.platform,
            values.name,
            values.url
          );

          await refreshShopData(selectedShop.id);
        }
      }
    });
  };

  const handleEditOnlineShop = (onlineShop) => {
    setQuery({
      id: 'edit-online-shop',
      title: 'Ubah Toko Online',
      fields: [
        {
          id: 'id',
          label: 'ID',
          type: 'text',
          readOnly: true,
          defaultValue: onlineShop.id
        },
        {
          id: 'platform',
          label: 'Platform',
          type: 'select',
          options: onlineShopPlatforms.map(platform => {
            return (
              {
                value: platform.id,
                label: platform.name,
                isDefault: (onlineShop.platform.id === platform.id)
              }
            );
          })
        }, 
        {
          id: 'name',
          label: 'Nama Toko',
          type: 'text',
          defaultValue: onlineShop.name
        },
        {
          id: 'url',
          label: 'URL',
          type: 'text',
          defaultValue: onlineShop.url
        }
      ],
      submit: {
        label: 'Simpan',
        callback: async (values) => {
          await editOnlineShop(
            selectedShop.id,
            values.id,
            values.platform,
            values.name,
            values.url
          );

          await refreshShopData(selectedShop.id);
        }
      }
    });
  };

  const handleDeleteOnlineShop = (onlineShop) => {
    setQuery({
      id: 'delete-online-shop',
      title: 'Hapus Toko Online',
      fields: [
        {
          id: 'id',
          label: 'ID',
          type: 'text',
          readOnly: true,
          defaultValue: onlineShop.id
        },
        {
          id: 'platform',
          label: 'Platform',
          type: 'text',
          readOnly: true,
          defaultValue: onlineShop.platform.name
        },
        {
          id: 'name',
          label: 'Nama Toko',
          type: 'text',
          readOnly: true,
          defaultValue: onlineShop.name
        }
      ],
      submit: {
        label: 'Hapus',
        danger: true,
        callback: async (values) => {
          await deleteOnlineShop(
            selectedShop.id,
            values.id
          );

          await refreshShopData(selectedShop.id);
        }
      }
    });
  };

  const handleCreateProduct = () => {
    setQuery({
      id: 'create-product',
      title: 'Tambahkan Produk Baru',
      fields: [
        {
          id: 'name',
          label: 'Nama',
          type: 'text'
        },
        {
          id: 'description',
          label: 'Deskripsi',
          type: 'textarea'
        },
        {
          id: 'minimumPrice',
          label: 'Harga Minimum',
          type: 'text'
        },
        {
          id: 'maximumPrice',
          label: 'Harga Maximum',
          type: 'text'
        },
        {
          id: 'category',
          label: 'Kategori',
          type: 'select',
          options: productCategories.map(category => {
            return (
              {
                value: category.id,
                label: category.name,
                isDefault: false
              }
            );
          })
        },
        {
          id: 'images',
          label: 'Foto Produk',
          type: 'image-list'
        }
      ],
      submit: {
        label: 'Tambahkan',
        callback: (values) => {
          console.log(values);
        }
      }
    });
  };

  const handleEditProduct = (product) => {
    setQuery({
      id: 'edit-product',
      title: 'Ubah Produk',
      fields: [
        {
          id: 'id',
          label: 'ID',
          type: 'text',
          readOnly: true,
          defaultValue: product.id
        },
        {
          id: 'name',
          label: 'Nama',
          type: 'text',
          defaultValue: product.name
        },
        {
          id: 'description',
          label: 'Deskripsi',
          type: 'textarea',
          defaultValue: product.description
        },
        {
          id: 'minimumPrice',
          label: 'Harga Minimum',
          type: 'text',
          defaultValue: product.minimumPrice
        },
        {
          id: 'maximumPrice',
          label: 'Harga Maximum',
          type: 'text',
          defaultValue: product.maximumPrice
        },
        {
          id: 'category',
          label: 'Kategori',
          type: 'select',
          options: productCategories.map(category => {
            return (
              {
                value: category.id,
                label: category.name,
                isDefault: (product.categoryName === category.name)
              }
            );
          })
        },
        {
          id: 'images',
          label: 'Foto Produk',
          type: 'image-list',
          initialImages: [
            '/dummy-images/fruits.jpg',
            '/dummy-images/meat.jpg',
            '/dummy-images/vegetables.jpg'
          ]
        }
      ],
      submit: {
        label: 'Simpan',
        callback: (values) => {
          console.log(values);
        }
      }
    });
  };

  const handleDeleteProduct = (product) => {
    setQuery({
      id: 'delete-product',
      title: 'Hapus Produk',
      fields: [
        {
          id: 'id',
          label: 'ID',
          type: 'text',
          readOnly: true,
          defaultValue: product.id
        },
        {
          id: 'name',
          label: 'Nama',
          type: 'text',
          readOnly: true,
          defaultValue: product.name
        }
      ],
      submit: {
        label: 'Hapus',
        danger: true,
        callback: (values) => {
          console.log(values);
        }
      }
    })
  };

  const handleCreateShopCategory = () => {
    setQuery({
      id: 'create-shop-category',
      title: 'Buat Kategori Toko Baru',
      fields: [
        {
          id: 'name',
          label: 'Nama',
          type: 'text'
        }
      ],
      submit: {
        label: 'Buat',
        callback: async (values) => {
          await createShopCategory(values.name);

          await getAllData();
        }
      }
    });
  }

  const handleEditShopCategory = (shopCategory) => {
    setQuery({
      id: 'edit-shop-category',
      title: 'Ubah Kategori Toko',
      fields: [
        {
          id: 'id',
          label: 'ID',
          type: 'text',
          readOnly: true,
          defaultValue: shopCategory.id
        },
        {
          id: 'name',
          label: 'Nama',
          type: 'text',
          defaultValue: shopCategory.name
        },
        {
          id: 'iconFile',
          label: 'File Icon',
          type: 'file',
          preview: `/api/public/assets/${shopCategory.iconFilename}`
        }
      ],
      submit: {
        label: 'Simpan',
        callback: async (values) => {
          await updateShopCategory(values.id, values.name);

          if (values.iconFile !== null && values.iconFile !== undefined) {
            await uploadFile(
              `/api/shops/shop-categories/${values.id}/icon`,
              'icon',
              values.iconFile,
              values.iconFile.name,
              'PUT');
          }

          await getAllData();
        }
      }
    });
  };

  const handleDeleteShopCategory = (shopCategory) => {
    setQuery({
      id: 'delete-shop-category',
      title: 'Hapus Kategori Toko',
      fields: [
        {
          id: 'id',
          label: 'ID',
          type: 'text',
          readOnly: true,
          defaultValue: shopCategory.id
        },
        {
          id: 'name',
          label: 'Nama',
          type: 'text',
          readOnly: true,
          defaultValue: shopCategory.name
        }
      ],
      submit: {
        label: 'Hapus',
        danger: true,
        callback: async (values) => {
          await deleteShopCategory(values.id);

          await getAllData();
        }
      }
    })
  };

  const handleCreateProductCategory = () => {
    setQuery({
      id: 'create-product-category',
      title: 'Buat Kategori Produk Baru',
      fields: [
        {
          id: 'name',
          label: 'Nama',
          type: 'text'
        }
      ],
      submit: {
        label: 'Buat',
        callback: async (values) => {
          await createProductCategory(values.name);

          await getAllData();
        }
      }
    })
  };

  const handleEditProductCategory = (productCategory) => {
    setQuery({
      id: 'edit-product-category',
      title: 'Ubah Kategori Produk',
      fields: [
        {
          id: 'id',
          label: 'ID',
          type: 'text',
          readOnly: true,
          defaultValue: productCategory.id
        },
        {
          id: 'name',
          label: 'Nama',
          type: 'text',
          defaultValue: productCategory.name
        },
        {
          id: 'thumbnailFile',
          label: 'Thumbnail Kategori',
          type: 'file'
        }
      ],
      submit: {
        label: 'Simpan',
        callback: async (values) => {
          await updateProductCategory(values.id, values.name);
  
          await getAllData();
        }
      }
    })
  };

  const handleDeleteProductCategory = (productCategory) => {
    setQuery({
      id: 'delete-product-category',
      title: 'Hapus Kategori Produk',
      fields: [
        {
          id: 'id',
          label: 'ID',
          type: 'text',
          readOnly: true,
          defaultValue: productCategory.id
        }, 
        {
          id: 'name',
          label: 'Nama',
          type: 'text',
          readOnly: true,
          defaultValue: productCategory.name
        }
      ],
      submit: {
        label: 'Hapus',
        danger: true,
        callback: async (values) => {
          await deleteProductCategory(values.id);

          await getAllData();
        }
      }
    });
  };

  const handleCreateOnlineShopPlatform = () => {
    setQuery({
      id: 'create-online-shop-platform',
      title: 'Buat Platform Toko Online Baru',
      fields: [
        {
          id: 'name',
          label: 'Nama',
          type: 'text'
        }
      ],
      submit: {
        label: 'Buat',
        callback: async (values) => {
          await createOnlineShopPlatform(values.name);

          await getAllData();
        }
      }
    });
  };

  const handleEditOnlineShopPlatform = (onlineShopPlatform) => {
    setQuery({
      id: 'edit-online-shop-platform',
      title: 'Ubah Platform Toko Online',
      fields: [
        {
          id: 'id',
          label: 'ID',
          type: 'text',
          readOnly: true,
          defaultValue: onlineShopPlatform.id
        },
        {
          id: 'name',
          label: 'Nama',
          type: 'text',
          defaultValue: onlineShopPlatform.name
        },
        {
          id: 'iconFile',
          label: 'File Icon',
          type: 'file'
        }
      ],
      submit: {
        label: 'Simpan',
        callback: async (values) => {
          await updateOnlineShopPlatform(values.id, values.name);

          await getAllData();
        }
      }
    });
  };

  const handleDeleteOnlineShopPlatform = (onlineShopPlatform) => {
    setQuery({
      id: 'delete-online-shop-platform',
      title: 'Ubah Platform Toko Online',
      fields: [
        {
          id: 'id',
          label: 'ID',
          type: 'text',
          readOnly: true,
          defaultValue: onlineShopPlatform.id
        },
        {
          id: 'name',
          label: 'Nama',
          type: 'text',
          readOnly: true,
          defaultValue: onlineShopPlatform.name
        }
      ],
      submit: {
        label: 'Hapus',
        danger: true,
        callback: async (values) => {
          await deleteOnlineShopPlatform(values.id);

          await getAllData();
        }
      }
    });
  };

  return (
    <AdminPageContainer>
      <ManipulateItemModal
        size='xl'
        query={query}
      />
      <AdminPageHeader title='Toko'>
        <ShopIcon />
      </AdminPageHeader>
      <StoreSelectContainer className={`d-flex flex-row align-items-center mb-3 ${(tabActiveKey === 'shop-management') ? 'hidden' : ''}`}>
        <p className='m-0 mr-2'>Toko:</p>
        <AdminFormControl as='select' title='Pilih toko' data-live-search='true' onChange={(event) => selectShop(event.target.value)}>
          {shops.map(shop => {
            return (
              <option value={shop.id}>{shop.name}</option>
            );
          })}
        </AdminFormControl>
      </StoreSelectContainer>
      <AdminPageTabContainer>
        <AdminPageNav>
          <Nav.Item>
            <AdminPageNavLink 
              onClick={() => setTabActiveKey('shop-profile')}
              active={tabActiveKey === 'shop-profile'}
            >
              <ShopIcon />
              <p>Profil</p>
            </AdminPageNavLink>
          </Nav.Item>
          <Nav.Item>
            <AdminPageNavLink 
              onClick={() => setTabActiveKey('shop-products')}
              active={tabActiveKey === 'shop-products'}
            >
              <ProductIcon />
              <p>Produk</p>
            </AdminPageNavLink>
          </Nav.Item>
          <Nav.Item>
            <AdminPageNavLink 
              onClick={() => setTabActiveKey('shop-preview')}
              active={tabActiveKey === 'shop-preview'}
            >
              <ViewIcon />
              <p>Preview</p>
            </AdminPageNavLink>
          </Nav.Item>
          <Nav.Item>
            <AdminPageNavLink 
              onClick={() => setTabActiveKey('shop-management')}
              active={tabActiveKey === 'shop-management'}
            >
              <CogsIcon />
              <p>Manajemen</p>
            </AdminPageNavLink>
          </Nav.Item>
        </AdminPageNav>
        <AdminPageTabContent>
          <Tab.Pane active={tabActiveKey === 'shop-profile'}>
            <AdminFormContainer>
              <h1 className='mb-3'>Tentang</h1>
              <Form className='mb-3'>
                <Form.Group>
                  <Form.Label>ID Toko</Form.Label>
                  <AdminFormControl type='text' readOnly defaultValue={selectedShop?.id} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Nama Toko</Form.Label>
                  <AdminFormControl id='shop-profile-name'
                    onChange={() => setCanSubmitProfileEdits(true)}
                    type='text' 
                    defaultValue={selectedShop?.name} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Deskripsi</Form.Label>
                  <AdminFormControl id='shop-profile-description' 
                    onChange={() => setCanSubmitProfileEdits(true)}
                    as='textarea' rows={5} 
                    className='form-control' 
                    defaultValue={selectedShop?.description} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Gambar Banner</Form.Label>
                  <div className='d-flex align-items-end flex-wrap'>
                    <ShopBanner 
                      id='shop-banner-image'
                      className='mb-2 mr-2' 
                      src={`/api/public/assets/${selectedShop?.bannerImage?.thumbnailFilename}`}
                      altsrc='/assets/imagenotfound.png' />
                    <CustomButton className='mb-2' onClick={() => bannerUploadInput.current.click()}>Unggah gambar baru</CustomButton>
                  </div>
                </Form.Group>
                <CustomButton disabled={!canSubmitProfileEdits} className='mr-2' onClick={() => handleSubmitShopProfileEdits()}>Simpan</CustomButton>
                <input type='file' style={{display: 'none'}} ref={bannerUploadInput} onChange={() => handleSetBannerImage()} />
                <CustomButton disabled={!canSubmitProfileEdits} secondary onClick={() => refreshShopData()}>Batalkan perubahan</CustomButton>
              </Form>
            </AdminFormContainer>
            <AdminFormContainer>
              <h1 className='mb-3'>Platform E-Commerce</h1>
              <CustomButton className='mb-3' onClick={() => handleAddOnlineShop()}>Toko online baru</CustomButton>
              <AdminTable>
                <thead>
                  <tr>
                    <th>Nama</th>
                    <th>URL</th>
                    <th>Plaform</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {onlineShops?.map((onlineShop) => {
                    return (
                      <tr>
                        <ItemWithIdTableCell>
                          <div>
                            <p>{onlineShop?.name}</p>
                            <p className='id'>{onlineShop?.id}</p>
                          </div>
                        </ItemWithIdTableCell>
                        <td>{onlineShop?.url}</td>
                        <ItemWithIdTableCell>
                          <div>
                            <p>{onlineShop?.platform.name}</p>
                            <p className='id'>{onlineShop?.platform.id}</p>
                          </div>
                        </ItemWithIdTableCell>
                        <td>
                          <span className='d-flex flex-row justify-content-end'>
                            <IconButton className='p-1 mr-2' iconOnly
                              onClick={() => handleEditOnlineShop(onlineShop)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton danger className='p-1' iconOnly
                              onClick={() => handleDeleteOnlineShop(onlineShop)}
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
          <Tab.Pane active={(tabActiveKey === 'shop-products')}>
            <AdminFormContainer>
              <h1 className='mb-3'>Produk</h1>
              <div className='d-flex flex-row mb-3 align-items-center flex-wrap justify-content-end'>
                <AdminFormControl type='text' placeholder='Cari produk' className='mb-1' style={{maxWidth: '16rem'}} />
                <div className='flex-grow-1' />
                <CustomButton className='mb-1' onClick={() => handleCreateProduct()}>Produk baru</CustomButton>
              </div>
              <AdminTable tableHeight='32rem'>
                <thead>
                  <tr>
                    <th>Nama</th>
                    <th>Kategori</th>
                    <th>Harga</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => {
                    return (
                      <tr>
                        <ItemWithIdTableCell>
                          <div>
                            <p>{product.name}</p>
                            <p className='id'>{product.id}</p>
                          </div>
                        </ItemWithIdTableCell>
                        <td>{product.categoryName}</td>
                        <td>{`${product.minimumPrice} - ${product.maximumPrice}`}</td>
                        <td>
                          <span className='d-flex flex-row justify-content-end'>
                            <IconButton className='p-1 mr-2' iconOnly
                              onClick={() => handleEditProduct(product)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton danger className='p-1' iconOnly
                              onClick={() => handleDeleteProduct(product)}
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
          <Tab.Pane active={(tabActiveKey === 'shop-preview')}>
            <AdminFormContainer>
              <h1>Preview</h1>
              <CustomButton>Menuju halaman toko</CustomButton>
            </AdminFormContainer>
          </Tab.Pane>
          <Tab.Pane active={tabActiveKey === 'shop-management'}>
            <AdminFormContainer>
              <h1>Kategori Toko</h1>
              <CustomButton className='mb-3' onClick={() => handleCreateShopCategory()}>Kategori toko baru</CustomButton>
              <AdminTable>
                <thead>
                  <tr>
                    <th>Nama</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {shopCategories.map(category => {
                    return (
                      <tr>
                        <ItemWithIdTableCell className='w-100' style={{display: 'table-cell'}}>
                          <div>
                            <p>{category.name}</p>
                            <p className='id'>{category.id}</p>
                          </div>
                        </ItemWithIdTableCell>
                        <td>
                          <span className='d-flex justify-content-end'>
                            <IconButton className='p-1 mr-2' iconOnly
                              onClick={() => handleEditShopCategory(category)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton className='p-1' iconOnly danger
                              onClick={() => handleDeleteShopCategory(category)}
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
              <h1>Kategori Produk</h1>
              <CustomButton className='mb-3' onClick={() => handleCreateProductCategory()}>Kategori produk baru</CustomButton>
              <AdminTable>
                <thead>
                  <tr>
                    <th>Nama</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {productCategories.map(category => {
                    return (
                      <tr>
                        <ItemWithIdTableCell className='w-100' style={{display: 'table-cell'}}>
                          <div>
                            <p>{category.name}</p>
                            <p className='id'>{category.id}</p>
                          </div>
                        </ItemWithIdTableCell>
                        <td>
                          <span className='d-flex justify-content-end'>
                            <IconButton className='p-1 mr-2' iconOnly
                              onClick={() => handleEditProductCategory(category)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton className='p-1' iconOnly danger
                              onClick={() => handleDeleteProductCategory(category)}
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
              <h1>Platform Toko Online</h1>
              <CustomButton className='mb-3' onClick={() => handleCreateOnlineShopPlatform()}>Platform baru</CustomButton>
              <AdminTable>
                <thead>
                  <tr>
                    <th>Nama</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {onlineShopPlatforms.map(platform => {
                    return (
                      <tr>
                        <ItemWithIdTableCell className='w-100' style={{display: 'table-cell'}}>
                          <div>
                            <p>{platform.name}</p>
                            <p className='id'>{platform.id}</p>
                          </div>
                        </ItemWithIdTableCell>
                        <td>
                          <span className='d-flex justify-content-end'>
                            <IconButton className='p-1 mr-2' iconOnly
                              onClick={() => handleEditOnlineShopPlatform(platform)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton className='p-1' iconOnly danger
                              onClick={() => handleDeleteOnlineShopPlatform(platform)}
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

export default AdminShopPage;