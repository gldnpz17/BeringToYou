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
import CreateFloorModal from "../modals/create-floor-modal";
import fetchAllMapOverlays from '../use-cases/common/fetch-all-map-overlays';
import EditIcon from "../svg/edit-icon";
import DeleteIcon from "../svg/delete-icon";
import EditOverlayModal from "../modals/edit-overlay-modal";
import MarketMap from "../components/market-map";
import websiteConfiguration from "../config";
import fetchAllShops from '../use-cases/common/fetch-all-shops';
import CreateOverlayModal from "../modals/create-overlay-modal";
import fetchAllPointsOfInterest from "../use-cases/common/fetch-all-points-of-interest";
import ItemWithIdTableCell from "../components/item-with-id-table-cell";
import fetchAllPointOfInterestCategories from '../use-cases/common/fetch-all-point-of-interest-categories';
import EditFloorModal from "../modals/edit-floor-modal";
import CreateShopModal from "../modals/create-shop-modal";
import EditShopModal from "../modals/edit-shop-modal";
import CreatePointOfInterestModal from "../modals/create-point-of-interest-modal";
import EditPointOfInterestModal from "../modals/edit-point-of-interest-modal";
import DeleteItemModal from "../modals/delete-item-modal";
import ManipulateItemModal from "../modals/manipulate-item-modal";

const AdminMapPage = () => {
  const [floors, setFloors] = useState([]);
  const [overlays, setOverlays] = useState([]);
  const [shops, setShops] = useState([]);
  const [pointsOfInterest, setPointsOfInterest] = useState([]);
  const [pointOfInterestCategories, setPointOfInterestCategories] = useState([]);

  const [createFloorModalShow, setCreateFloorModalShow] = useState(false);
  const [floorToCreate, setFloorToCreate] = useState(null);

  const [editFloorModalShow, setEditFloorModalShow] = useState(false);
  const [floorToEdit, setFloorToEdit] = useState(null);

  const [createOverlayModalShow, setCreateOverlayModalShow] = useState(false);

  const [editOverlayModalShow, setEditOverlayModalShow] = useState(false);
  const [overlayToEdit, setOverlayToEdit] = useState(null);

  const [createShopModalShow, setCreateShopModalShow] = useState(false);

  const [editShopModalShow, setEditShopModalShow] = useState(false);
  const [shopToEdit, setShopToEdit] = useState(null);

  const [createPointOfInterestModalShow, setCreatePointOfInterestModalShow] = useState(false);

  const [editPointOfInterestModalShow, setEditPointOfInterestModalShow] = useState(false);
  const [pointOfInterestToEdit, setPointOfInterestToEdit] = useState(null);

  const [query, setQuery] = useState(null);

  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = async () => {
    setFloors(await fetchAllMapFloors());
    setOverlays(await fetchAllMapOverlays());
    setShops(await fetchAllShops());
    setPointsOfInterest(await fetchAllPointsOfInterest());
    setPointOfInterestCategories(await fetchAllPointOfInterestCategories());
  };

  const handleCreateFloorModalOpen = () => {
    let highestFloor = 1;

    floors.forEach(floor => {
      if (floor.floorNumber > highestFloor) {
        highestFloor = floor.floorNumber;
      }
    });

    setFloorToCreate(highestFloor + 1);

    setCreateFloorModalShow(true);
  };

  const handleEditFloorModalOpen = (floor) => {
    setFloorToEdit(floor);

    setEditFloorModalShow(true);
  };

  const handleDeleteFloorModalOpen = (floor) => {
    setItemToDelete({
      properties: [
        {
          label: 'Lantai',
          value: floor.floorNumber
        }
      ],
      callback: () => {
        alert(`deleted item ${floor.floorNumber}`);
      }
    });
  };

  const handleCreateOverlayModalOpen = () => setCreateOverlayModalShow(true);

  const handleEditOverlayModalOpen = (overlay) => {
    setOverlayToEdit(overlay);

    setEditOverlayModalShow(true);
  };

  const handleDeleteOverlayModalOpen = (overlay) => {
    setItemToDelete({
      properties: [
        {
          label: 'ID',
          value: overlay.id
        },
        {
          label: 'Nama',
          value: overlay.name
        }
      ],
      callback: () => {
        alert(`deleted item ${overlay.name}`);
      }
    });
  };

  const handleCreateShopModalOpen = () => setCreateShopModalShow(true);

  const handleEditShopModalOpen = (shop) => {
    setShopToEdit(shop);

    setEditShopModalShow(true);
  };

  const handleDeleteShopModalOpen = (shop) => {
    setItemToDelete({
      properties: [
        {
          label: 'ID',
          value: shop.id
        },
        {
          label: 'Nama',
          value: shop.name
        }
      ],
      callback: () => {
        alert(`deleted item ${shop.name}`);
      }
    });
  };

  const handleCreatePointOfInterestCategoryModalOpen = () => setCreatePointOfInterestModalShow(true);

  const handleEditPointOfInterestModalOpen = (pointOfInterest) => {
    setPointOfInterestToEdit(pointOfInterest);

    setEditPointOfInterestModalShow(true);
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

  return (
    <AdminPageContainer>
      <CreateFloorModal
        show={createFloorModalShow}
        floor={floorToCreate}
        setShow={setCreateFloorModalShow}
      />
      <EditFloorModal 
        show={editFloorModalShow}
        floor={floorToEdit}
        setShow={setEditFloorModalShow}
      />
      <CreateOverlayModal 
        show={createOverlayModalShow}
        setShow={setCreateOverlayModalShow}
      />
      <EditOverlayModal 
        show={editOverlayModalShow}
        overlay={overlayToEdit}
        setShow={setEditOverlayModalShow}
      />
      <CreateShopModal 
        show={createShopModalShow}
        setShow={setCreateShopModalShow}
      />
      <EditShopModal 
        show={editShopModalShow}
        shop={shopToEdit}
        setShow={setEditShopModalShow}
      />
      <CreatePointOfInterestModal
        show={createPointOfInterestModalShow}
        setShow={setCreatePointOfInterestModalShow}
      />
      <EditPointOfInterestModal
        show={editPointOfInterestModalShow}
        pointOfInterest={pointOfInterestToEdit}
        setShow={setEditPointOfInterestModalShow}
      />
      <DeleteItemModal
        item={itemToDelete}
      />
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
              <CustomButton className='mb-3' onClick={() => handleCreateFloorModalOpen()}>Lantai baru</CustomButton>
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
                              onClick={() => handleEditFloorModalOpen(floor)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton danger className='p-1' iconOnly
                              onClick={() => handleDeleteFloorModalOpen(floor)}
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
              <CustomButton className='mb-3' onClick={() => handleCreateOverlayModalOpen()}>Overlay baru</CustomButton>
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
                              onClick={() => handleEditOverlayModalOpen(overlay)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton className='p-1' iconOnly danger
                              onClick={() => handleDeleteOverlayModalOpen(overlay)}
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
                <CustomButton className='mb-1' onClick={() => handleCreateShopModalOpen()}>Toko baru</CustomButton>
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
                              onClick={() => handleEditShopModalOpen(shop)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton className='p-1' iconOnly danger
                              onClick={() => handleDeleteShopModalOpen(shop)}
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
                <CustomButton className='mb-1' onClick={() => handleCreatePointOfInterestCategoryModalOpen()}>Point of interest baru</CustomButton>
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
                              onClick={() => handleEditPointOfInterestModalOpen(pointOfInterest)}
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
                              onClick={() => {}}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton className='p-1' iconOnly danger
                              onClick={() => {}}
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