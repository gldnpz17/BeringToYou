import AdminPageContainer from "../components/admin-page-container";
import AdminPageHeader from "../components/admin-page-header";
import AdminPageNav from "../components/admin-page-nav";
import AdminPageTabContainer from "../components/admin-page-tab-container";
import MapIcon from "../svg/map-icon";
import { Nav, Tab } from "react-bootstrap"; 
import AdminPageNavLink from "../components/admin-page-nav-link";
import LocationIcon from "../svg/location-icon";
import LayersIcon from "../svg/layers-icon";
import AdminPageTabContent from "../components/admin-page-tab-content";
import AdminFormContainer from "../components/admin-form-container";
import AdminTable from "../components/admin-table";
import CustomButton from "../components/custom-button";
import { useEffect, useState } from "react";
import fetchAllMapFloors from "../use-cases/common/fetch-all-map-floors";
import IconButton from "../components/icon-button";
import AdminFormControl from "../components/admin-form-control";
import fetchAllMapOverlays from '../use-cases/common/fetch-all-map-overlays';
import EditIcon from "../svg/edit-icon";
import DeleteIcon from "../svg/delete-icon";
import MarketMap from "../components/market-map";
import websiteConfiguration from "../config";
import fetchAllShops from '../use-cases/common/fetch-all-shops';
import fetchAllPointsOfInterest from "../use-cases/common/fetch-all-points-of-interest";
import ItemWithIdTableCell from "../components/item-with-id-table-cell";
import fetchAllPointOfInterestCategories from '../use-cases/common/fetch-all-point-of-interest-categories';
import ManipulateItemModal from "../modals/manipulate-item-modal";
import fetchAllShopCategories from "../use-cases/common/fetch-all-shop-categories";

const AdminMapPage = () => {
  const [floors, setFloors] = useState([]);
  const [overlays, setOverlays] = useState([]);
  const [shops, setShops] = useState([]);
  const [shopCategories, setShopCategories] = useState([]);
  const [pointsOfInterest, setPointsOfInterest] = useState([]);
  const [pointOfInterestCategories, setPointOfInterestCategories] = useState([]);

  const [query, setQuery] = useState(null);

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = async () => {
    setFloors(await fetchAllMapFloors());
    setOverlays(await fetchAllMapOverlays());
    setShops(await fetchAllShops());
    setPointsOfInterest(await fetchAllPointsOfInterest());
    setPointOfInterestCategories(await fetchAllPointOfInterestCategories());
    setShopCategories(await fetchAllShopCategories());
  };

  const handleCreateFloor = () => {
    let highestFloor = 1;

    floors.forEach(floor => {
      if (floor.floorNumber > highestFloor) {
        highestFloor = floor.floorNumber;
      }
    });

    setQuery({
      id: 'create-floor',
      title: 'Tambahkan Lantai Baru',
      fields: [
        {
          id: 'floorNumber',
          label: 'Lantai',
          type: 'text',
          defaultValue: highestFloor + 1
        },
        {
          id: 'kmlFile',
          label: 'File KML',
          type: 'file'
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

  const handleEditFloor = (floor) => {
    setQuery({
      id: 'edit-floor',
      title: 'Ubah Lantai',
      fields: [
        {
          id: 'floorNumber',
          label: 'Lantai',
          type: 'text',
          defaultValue: floor.floorNumber
        },
        {
          id: 'kmlFile',
          label: 'File KML',
          type: 'file'
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

  const handleDeleteFloor = (floor) => {
    setQuery({
      id: 'delete-floor',
      title: 'Hapus Lantai',
      fields: [
        {
          id: 'floorNumber',
          label: 'Lantai',
          type: 'text',
          readOnly: true,
          defaultValue: floor.floorNumber
        }
      ],
      submit: {
        label: 'Hapus',
        danger: true,
        callback: () => {
          alert(`deleted item ${floor.floorNumber}`);
        }
      }
    });
  };

  const handleCreateOverlay = () => {
    setQuery({
      id: 'create-overlay',
      title: 'Tambahkan Overlay Baru',
      fields: [
        {
          id: 'name',
          label: 'Nama',
          type: 'text'
        },
        {
          id: 'zIndex',
          label: 'Z-Index',
          type: 'text'
        },
        {
          id: 'floorNumber',
          label: 'Lantai',
          type: 'select',
          options: floors.map(floor => {
            return (
              {
                value: floor.floorNumber,
                label: `Lantai ${floor.floorNumber}`,
                isDefault: false
              }
            );
          })
        },
        {
          id: 'kmlFile',
          label: 'File KML',
          type: 'file'
        },
        {
          id: 'iconFile',
          label: 'File Icon',
          type: 'file'
        }
      ],
      submit: {
        label: 'Tambahkan',
        callback: (values) => {
          console.log(values);
        }
      }
    });
  }

  const handleEditOverlay = (overlay) => {
    setQuery({
      id: 'edit-overlay',
      title: 'Ubah Overlay Baru',
      fields: [
        {
          id: 'id',
          label: 'ID',
          type: 'text',
          readOnly: true,
          defaultValue: overlay.id
        },
        {
          id: 'name',
          label: 'Nama',
          type: 'text',
          defaultValue: overlay.name
        },
        {
          id: 'zIndex',
          label: 'Z-Index',
          type: 'text',
          defaultValue: overlay.zIndex
        },
        {
          id: 'floorNumber',
          label: 'Lantai',
          type: 'select',
          options: floors.map(floor => {
            return (
              {
                value: floor.floorNumber,
                label: `Lantai ${floor.floorNumber}`,
                isDefault: (floor.floorNumber === overlay.floorNumber)
              }
            );
          })
        },
        {
          id: 'kmlFile',
          label: 'File KML',
          type: 'file'
        },
        {
          id: 'iconFile',
          label: 'File Icon',
          type: 'file'
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

  const handleDeleteOverlay = (overlay) => {
    setQuery({
      id: 'delete-overlay',
      title: 'Hapus Overlay',
      fields: [
        {
          id: 'id',
          label: 'ID',
          type: 'text',
          readOnly: true,
          defaultValue: overlay.id
        },
        {
          id: 'name',
          label: 'Nama',
          type: 'text',
          readOnly: true,
          defaultValue: overlay.name
        }
      ],
      submit: { 
        label: 'Hapus',
        danger: true,
        callback: (values) => {
          alert(`deleted item ${values.name}`);
        }
      }
    });
  };

  const handleCreateShop = () => {
    setQuery({
      id: 'create-shop',
      title: 'Tambahkan Toko Baru',
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
          id: 'floorNumber',
          label: 'Lantai',
          type: 'select',
          options: floors.map(floor => {
            return (
              {
                value: floor.floorNumber,
                label: `Lantai ${floor.floorNumber}`,
                isDefault: false
              }
            );
          })
        },
        {
          id: 'latitude',
          label: 'Latitude',
          type: 'text'
        },
        {
          id: 'longitude',
          label: 'Longitude',
          type: 'text'
        },
        {
          id: 'category',
          label: 'Kategori',
          type: 'select',
          options: shopCategories.map(category => {
            return (
              {
                value: category.id,
                label: category.name,
                isDefault: false
              }
            );
          })
        }
      ],
      submit: {
        label: 'Tambahkan',
        callback: (values) => {
          console.log(values);
        }
      }
    });
  }

  const handleEditShop = (shop) => {
    setQuery({
      id: 'edit-shop',
      title: 'Ubah Toko',
      fields: [
        {
          id: 'id',
          label: 'Nama',
          type: 'text',
          readOnly: true,
          defaultValue: shop.id
        },
        {
          id: 'name',
          label: 'Nama',
          type: 'text',
          defaultValue: shop.name
        },
        {
          id: 'description',
          label: 'Deskripsi',
          type: 'textarea',
          defaultValue: shop.description
        },
        {
          id: 'floorNumber',
          label: 'Lantai',
          type: 'select',
          options: floors.map(floor => {
            return (
              {
                value: floor.floorNumber,
                label: `Lantai ${floor.floorNumber}`,
                isDefault: (floor.floorNumber === shop.floor)
              }
            );
          })
        },
        {
          id: 'latitude',
          label: 'Latitude',
          type: 'text',
          defaultValue: shop.latitude
        },
        {
          id: 'longitude',
          label: 'Longitude',
          type: 'text',
          defaultValue: shop.longitude
        },
        {
          id: 'category',
          label: 'Kategori',
          type: 'select',
          options: shopCategories.map(category => {
            return (
              {
                value: category.id,
                label: category.name,
                isDefault: (category.name === shop.shopCategoryName)
              }
            );
          })
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

  const handleDeleteShop = (shop) => {
    setQuery({
      id: 'delete-shop',
      title: 'Hapus Toko',
      fields: [
        {
          id: 'id',
          label: 'ID',
          type: 'text',
          readOnly: true,
          defaultValue: shop.id
        },
        {
          id: 'name',
          label: 'Nama',
          type: 'text',
          readOnly: true,
          defaultValue: shop.name
        }
      ],
      submit: {
        label: 'Hapus',
        danger: true,
        callback: (values) => {
          alert(`deleted item ${values.name}`);
        }
      }
    });
  };

  const handleCreatePointOfInterest = () => {
    setQuery({
      id: 'create-point-of-interest',
      title: 'Buat Point Of Interest Baru',
      fields: [
        {
          id: 'floorNumber',
          label: 'Lantai',
          type: 'select',
          options: floors.map(floor => {
            return (
              {
                value: floor.floorNumber,
                label: `Lantai ${floor.floorNumber}`,
                isDefault: false
              }
            );
          })
        },
        {
          id: 'latitude',
          label: 'Latitude',
          type: 'text'
        },
        {
          id: 'longitude',
          label: 'Longitude',
          type: 'text'
        },
        {
          id: 'category',
          label: 'Kategori',
          type: 'select',
          options: pointOfInterestCategories.map(category => {
            return (
              {
                value: category.id,
                label: category.name,
                isDefault: false
              }
            );
          })
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

  const handleEditPointOfInterest = (pointOfInterest) => {
    setQuery({
      id: 'edit-point-of-interest',
      title: 'Ubah Point Of Interest',
      fields: [
        {
          id: 'id',
          label: 'ID',
          type: 'text',
          readOnly: true,
          defaultValue: pointOfInterest.id
        },
        {
          id: 'floorNumber',
          label: 'Lantai',
          type: 'select',
          options: floors.map(floor => {
            return (
              {
                value: floor.floorNumber,
                label: `Lantai ${floor.floorNumber}`,
                isDefault: (floor.floorNumber === pointOfInterest.floorNumber)
              }
            );
          })
        },
        {
          id: 'latitude',
          label: 'Latitude',
          type: 'text',
          defaultValue: pointOfInterest.latitude
        },
        {
          id: 'longitude',
          label: 'Longitude',
          type: 'text',
          defaultValue: pointOfInterest.longitude
        },
        {
          id: 'category',
          label: 'Kategori',
          type: 'select',
          options: pointOfInterestCategories.map(category => {
            return (
              {
                value: category.id,
                label: category.name,
                isDefault: (category.id === pointOfInterest.category.id)
              }
            );
          })
        }
      ],
      submit: {
        label: 'Simpan',
        callback: (values) => {
          console.log(values);
        }
      }
    })
  };

  const handleDeletePointOfInterest = (pointOfInterest) => {
    setQuery({
      id: 'delete-point-of-interest',
      title: 'Hapus Point of Interest',
      fields: [
        {
          id: 'id',
          label: 'ID',
          type: 'text',
          defaultValue: pointOfInterest.id,
          readOnly: true
        }
      ],
      submit: {
        label: 'Hapus',
        danger: true,
        callback: () => {
          alert(`deleted item ${pointOfInterest.id}`);
        }
      }
    });
  };

  const handleCreatePointOfInterestCategory = () => {
    setQuery({
      id: 'create-point-of-interest-category',
      title: 'Buat Kategori Point of Interest Baru',
      fields: [
        {
          id: 'name',
          type: 'text',
          label: 'Nama'
        },
        {
          id: 'iconFile',
          type: 'file',
          label: 'File Icon'
        }
      ],
      submit: {
        label: 'Buat',
        callback: (values) => {
          console.log(values);
        }
      }
    });
  };

  const handleEditPointOfInterestCategory = (pointOfInterestCategory) => {
    setQuery({
      id: 'edit-point-of-interest-category',
      title: 'Ubah Kategori Point of Interest',
      fields: [
        {
          id: 'id',
          type: 'text',
          label: 'ID',
          readOnly: true,
          defaultValue: pointOfInterestCategory.id
        },
        {
          id: 'name',
          type: 'text',
          label: 'Nama',
          defaultValue: pointOfInterestCategory.name
        },
        {
          id: 'iconFile',
          type: 'file',
          label: 'File Icon'
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

  const handleDeletePointOfInterestCategory = (pointOfInterestCategory) => {
    setQuery({
      id: 'delete-point-of-interest-category',
      title: 'Hapus Kategori Point of Interest',
      fields: [
        {
          id: 'id',
          type: 'text',
          label: 'ID',
          readOnly: true,
          defaultValue: pointOfInterestCategory.id
        },
        {
          id: 'name',
          type: 'text',
          label: 'Nama',
          readOnly: true,
          defaultValue: pointOfInterestCategory.name
        }
      ],
      submit: {
        label: 'Hapus',
        danger: true,
        callback: (values) => {
          console.log(values);
        }
      }
    });
  };

  return (
    <AdminPageContainer>
      <ManipulateItemModal
        query={query}
      />
      <AdminPageHeader title='Peta Digital'>
        <MapIcon />
      </AdminPageHeader>
      <div className='d-flex flex-row justify-content-center pe-2 pe-md-3'>
        <AdminFormContainer className='w-100 p-1 mb-3'>
          <div style={{position: 'relative', height: '24rem'}}>
            <MarketMap
              style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}}
              accessToken={websiteConfiguration.mapAccessToken}
            />
          </div>
        </AdminFormContainer>
      </div>
      <AdminPageTabContainer defaultActiveKey='layers'>
        <AdminPageNav>
          <Nav.Item>
            <AdminPageNavLink eventKey='layers'>
              <LayersIcon />
              <p>Lapisan</p>
            </AdminPageNavLink>
            <AdminPageNavLink eventKey='locations'>
              <LocationIcon />
              <p>Lokasi</p>
            </AdminPageNavLink>
          </Nav.Item>
        </AdminPageNav>
        <AdminPageTabContent>
          <Tab.Pane eventKey='layers'>
            <AdminFormContainer>
              <h1 className='mb-3'>Lantai</h1>
              <CustomButton className='mb-3' onClick={() => handleCreateFloor()}>Lantai baru</CustomButton>
              <AdminTable>
                <thead>
                  <tr>
                    <th>Lantai</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {floors.map(floor => {
                    return (
                      <tr>
                        <td className='text-center w-100'>{floor?.floorNumber}</td>
                        <td>
                          <span className='d-flex flex-row justify-content-end'>
                            <IconButton className='p-1 me-2' iconOnly
                              onClick={() => handleEditFloor(floor)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton danger className='p-1' iconOnly
                              onClick={() => handleDeleteFloor(floor)}
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
              <h1 className='mb-3'>Overlay</h1>
              <CustomButton className='mb-3' onClick={() => handleCreateOverlay()}>Overlay baru</CustomButton>
              <AdminTable>
                <thead>
                  <tr>
                    <th>Nama</th>
                    <th>Lantai</th>
                    <th className='text-nowrap'>Z-Index</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {overlays.map(overlay => {
                    return (
                      <tr>
                        <td>
                          <ItemWithIdTableCell>
                            <div>
                              <td>{overlay?.name}</td>
                              <p className='id'>{overlay?.id}</p>
                            </div>
                          </ItemWithIdTableCell>
                        </td>
                        <td>{overlay?.floorNumber}</td>
                        <td>{overlay?.zIndex}</td>
                        <td>
                          <span className='d-flex justify-content-end'>
                            <IconButton className='p-1 me-2' iconOnly
                              onClick={() => handleEditOverlay(overlay)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton className='p-1' iconOnly danger
                              onClick={() => handleDeleteOverlay(overlay)}
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
          <Tab.Pane eventKey='locations'>
            <AdminFormContainer>
              <h1 className='mb-3'>Toko</h1>
              <div className='d-flex flex-row mb-3 align-items-center flex-wrap justify-content-end'>
                <AdminFormControl type='text' placeholder='Cari toko' className='mb-1' style={{maxWidth: '16rem'}} />
                <div className='flex-grow-1' />
                <CustomButton className='mb-1' onClick={() => handleCreateShop()}>Toko baru</CustomButton>
              </div>
              <AdminTable>
                <thead>
                  <tr>
                    <th>Nama</th>
                    <th>Lantai</th>
                    <th>Koordinat</th>
                    <th>Kategori</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {shops.map(shop => {
                    return (
                      <tr>
                        <td>
                          <ItemWithIdTableCell>
                            <div>
                              <td>{shop?.name}</td>
                              <p className='id'>{shop?.id}</p>
                            </div>
                          </ItemWithIdTableCell>
                        </td>
                        <td>{shop?.floor}</td>
                        <td>{`(${shop?.latitude}, ${shop?.longitude})`}</td>
                        <td>{shop?.shopCategoryName}</td>
                        <td>
                          <span className='d-flex justify-content-end'>
                            <IconButton className='p-1 me-2' iconOnly
                              onClick={() => handleEditShop(shop)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton className='p-1' iconOnly danger
                              onClick={() => handleDeleteShop(shop)}
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
              <h1 className='mb-3'>Point of Interest</h1>
              <div className='d-flex flex-row mb-3 align-items-center flex-wrap justify-content-end'>
                <AdminFormControl type='text' placeholder='Cari point of interest' className='mb-1' style={{maxWidth: '16rem'}} />
                <div className='flex-grow-1' />
                <CustomButton className='mb-1' onClick={() => handleCreatePointOfInterest()}>Point of interest baru</CustomButton>
              </div>
              <AdminTable>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Kategori</th>
                    <th>Lantai</th>
                    <th>Koordinat</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {pointsOfInterest.map(pointOfInterest => {
                    return (
                      <tr>
                        <td>{pointOfInterest?.id}</td>
                        <ItemWithIdTableCell>
                          <div>
                            <p>{pointOfInterest?.category.name}</p>
                            <p className='id'>{pointOfInterest?.category.id}</p>
                          </div>
                        </ItemWithIdTableCell>
                        <td>{pointOfInterest?.floorNumber}</td>
                        <td>{`(${pointOfInterest?.latitude}, ${pointOfInterest?.longitude})`}</td>
                        <td>
                          <span className='d-flex justify-content-end'>
                            <IconButton className='p-1 me-2' iconOnly
                              onClick={() => handleEditPointOfInterest(pointOfInterest)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton className='p-1' iconOnly danger
                              onClick={() => handleDeletePointOfInterest(pointOfInterest)}
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
              <h1 className='mb-3'>Kategori Point of Interest</h1>
              <CustomButton className='mb-3' onClick={() => handleCreatePointOfInterestCategory()}>Kategori baru</CustomButton>
              <AdminTable>
                <thead>
                  <tr>
                    <th>Nama</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {pointOfInterestCategories.map(category => {
                    return (
                      <tr>
                        <td>
                          <ItemWithIdTableCell>
                            <div>
                              <p>{category?.name}</p>
                              <p className='id'>{category?.id}</p>
                            </div>
                          </ItemWithIdTableCell>
                        </td>
                        <td>
                          <span className='d-flex justify-content-end'>
                            <IconButton className='p-1 me-2' iconOnly
                              onClick={() => handleEditPointOfInterestCategory(category)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton className='p-1' iconOnly danger
                              onClick={() => handleDeletePointOfInterestCategory(category)}
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

export default AdminMapPage;