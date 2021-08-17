import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import AdminFormControl from "../components/admin-form-control";
import AdminFormGroup from "../components/admin-form-group";
import AdminModal from "../components/admin-modal";
import CustomButton from "../components/custom-button";
import FormCheck from "../components/form-check";
import IconButton from "../components/icon-button";
import { getGpsCoordinates } from "../helpers/get-gps-coordinates";
import GpsCrosshairIcon from "../svg/gps-crosshair-icon";
import updateShop from "../use-cases/admin/map/update-shop";
import fetchAllMapFloors from "../use-cases/common/fetch-all-map-floors";
import fetchAllShopCategories from "../use-cases/common/fetch-all-shop-categories";
import fetchShopCategorySubcategories from "../use-cases/common/fetch-shop-category-subcategories";
import fetchShopDetails from "../use-cases/common/fetch-shop-details";

const EditShopModal = ({ shopId, show, setShow, ...props }) => {
  const [shop, setShop] = useState(null);
  const [floors, setFloors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    if (show && shopId) {
      fetchData();
    } else {
      setShop(null);
    }
  }, [show])

  const fetchData = async () => {
    setShop(await fetchShopDetails(shopId));
    setFloors(await fetchAllMapFloors());
    setCategories(await fetchAllShopCategories());
  }

  const handleCategoryChange = async (event) => {
    fetchSubcategories(event.target.value);
  }

  useEffect(() => {
    if (shop) {
      fetchSubcategories(shop.category.id)
    }
  }, [shop])

  const fetchSubcategories = async (categoryId) => {
    setSubcategories(await fetchShopCategorySubcategories(categoryId));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    let data = new FormData(event.target);

    let response = await updateShop(
      data.get('id'),
      data.get('name'),
      data.get('description'),
      data.get('minimum-price'),
      data.get('maximum-price'),
      data.get('floor'),
      data.get('latitude'),
      data.get('longitude'),
      data.get('category'),
      data.getAll('subcategories')
    );

    if (response.status === 200) {
      enqueueSnackbar('Data toko berhasil diubah.', {
        variant: 'success'
      });
    } else {
      enqueueSnackbar('Data toko gagal diubah.', {
        variant: 'error'
      });
    }

    setShow(false);
  }

  const handleSetCoordinates = async () => {
    try {
      let [latitude, longitude] = await getGpsCoordinates();

      document.getElementById('edit-shop-latitude').value = latitude;
      document.getElementById('edit-shop-longitude').value = longitude;
    } catch (err) {
      enqueueSnackbar('Gagal memperoleh koordinat saat ini.', {
        variant: 'error'
      });
    }
  }

  if (shop && floors && categories) {
    return (
      <AdminModal show={show} setShow={setShow} {...props}>
        <form method='POST' onSubmit={handleSubmit}>
          <Modal.Header>
            <Modal.Title>Ubah Toko</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AdminFormGroup label='ID'>
              <AdminFormControl name='id' type='text' readOnly
                defaultValue={shop.id}
              />
            </AdminFormGroup>
            <AdminFormGroup label='Nama'>
              <AdminFormControl name='name' type='text'
                defaultValue={shop.name}
              />
            </AdminFormGroup>
            <AdminFormGroup label='Deskripsi'>
              <AdminFormControl name='description' as='textarea'
                className='form-control'
                defaultValue={shop.description}
                rows={5}
              />
            </AdminFormGroup>
            <AdminFormGroup label='Lantai'>
              <AdminFormControl name='floor' as='select'>
                {floors.map(floor => {
                  return (
                    <option
                      value={floor.floorNumber}
                      defaultChecked={floor.floorNumber === shop.floor}
                    >
                      {`Lantai ${floor.floorNumber}`}
                    </option>
                  );
                })}
              </AdminFormControl>
            </AdminFormGroup>
            <AdminFormGroup label='Lat/Long'>
              <div className='d-flex'>
                <AdminFormControl name='latitude' type='text'
                  id='edit-shop-latitude'
                  className='mr-2'
                  defaultValue={shop.latitude}
                />
                <AdminFormControl name='longitude' type='text'
                  id='edit-shop-longitude'
                  className='mr-2'
                  defaultValue={shop.longitude}
                />
                <IconButton iconOnly className='p-1'
                  onClick={handleSetCoordinates}
                >
                  <GpsCrosshairIcon />
                </IconButton>
              </div>
            </AdminFormGroup>
            <AdminFormGroup label='Kategori'>
              <AdminFormControl name='category' as='select'
                onChange={handleCategoryChange}
              >
                {categories.map(category => {
                  return (
                    <option
                      key={category.id}
                      value={category.id}
                      selected={category.id === shop.category.id}
                    >
                      {category.name}
                    </option>
                  );
                })}
              </AdminFormControl>
            </AdminFormGroup>
            <AdminFormGroup label='Subkategori'>
              {(() => {
                if (subcategories) {
                  return (
                    subcategories.map(subcategory => {
                      return (
                        <FormCheck
                          key={subcategory.id}
                          name='subcategories'
                          value={subcategory.id}
                          label={subcategory.name}
                          defaultChecked={shop.subcategories.find(shopSubcategory => shopSubcategory.id === subcategory.id)}
                        />
                      );
                    })
                  );
                } else {
                  return (<p>Silahkan pilih salah satu kategori utama.</p>);
                }
              })()}
            </AdminFormGroup>
            <AdminFormGroup label='Harga Minimum'>
              <AdminFormControl name='minimum-price' type='text'
                defaultValue={shop.minPrice}
              />
            </AdminFormGroup>
            <AdminFormGroup label='Harga Maksimum'>
              <AdminFormControl name='maximum-price' type='text'
                defaultValue={shop.maxPrice}
              />
            </AdminFormGroup>
          </Modal.Body>
          <Modal.Footer>
            <CustomButton type='submit' onClick={() => { }}>Simpan</CustomButton>
            <CustomButton secondary onClick={() => setShow(false)}>Batal</CustomButton>
          </Modal.Footer>
        </form>
      </AdminModal>
    );
  } else {
    return null;
  }
};

export default EditShopModal;