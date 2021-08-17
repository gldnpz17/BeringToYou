import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import AdminFormControl from "../components/admin-form-control";
import AdminFormGroup from "../components/admin-form-group";
import AdminModal from "../components/admin-modal";
import AdminTable from "../components/admin-table";
import CustomButton from "../components/custom-button";
import IconButton from "../components/icon-button";
import DeleteIcon from "../svg/delete-icon";
import SaveIcon from '../svg/save-icon';
import createShopCategorySubcategory from '../use-cases/admin/shop/create-shop-category-subcategory';
import deleteShopSubcategory from "../use-cases/admin/shop/delete-shop-subcategory";
import updateShopSubcategory from "../use-cases/admin/shop/update-shop-subcategory";
import fetchShopCategorySubcategories from "../use-cases/common/fetch-shop-category-subcategories";

const EditShopSubcategoriesModal = ({ category, ...props }) => {
  const [subcategories, setSubcategories] = useState([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    if (props.show) {
      getSubcategories();
    }
  }, [props.show])

  const getSubcategories = async () => {
    setSubcategories(await fetchShopCategorySubcategories(category.id));
  };

  const handleSubmitAddSubcategory = async (event) => {
    event.preventDefault();

    let data = new FormData(event.target);

    let response = await createShopCategorySubcategory(category.id, data.get('name'));

    if (response.status === 200) {
      enqueueSnackbar('Subkategori ditambahkan.', {
        variant: 'success'
      });
    } else {
      enqueueSnackbar('Gagal menambahkan subkategori.', {
        variant: 'error'
      });
    }

    event.target.reset();

    await getSubcategories();
  };

  const handleUpdateShopSubcategory = async (event) => {
    event.preventDefault();

    let data = new FormData(event.target);

    let response = await updateShopSubcategory(
      data.get('id'),
      data.get('name'),
      data.get('color')
    );

    if (response.status === 200) {
      enqueueSnackbar('Perubahan tersimpan.', {
        variant: 'success'
      });
    } else {
      enqueueSnackbar('Perubahan gagal tersimpan.', {
        variant: 'error'
      });
    }

    await getSubcategories();
  };

  const handleDeleteSubcategory = async (subcategory) => {
    let response = await deleteShopSubcategory(subcategory.id);

    if (response.status === 200) {
      enqueueSnackbar('Subkategori terhapus.', {
        variant: 'success'
      });
    } else {
      enqueueSnackbar('Subkategori gagal terhapus.', {
        variant: 'error'
      });
    }

    await getSubcategories();
  }

  return (
    <AdminModal {...props}>
      <Modal.Header>
        <Modal.Title>Ubah Subkategori Toko</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AdminFormGroup label='Kategori'>
          <AdminFormControl type='text' readOnly defaultValue={category?.name} />
        </AdminFormGroup>
        <AdminFormGroup label='Subkategori'>
          <form method='POST' className='mb-2 d-flex flex-row align-items-center'
            onSubmit={handleSubmitAddSubcategory}
          >
            <AdminFormControl name='name'
              className='mr-2' type='text'
              placeholder='Nama subkategori baru'
            />
            <CustomButton type='submit' onClick={() => { }}>Tambah</CustomButton>
          </form>
          <AdminTable>
            <thead>
              <tr>
                <th>Properti Subkategori</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {subcategories.map((subcategory) => {
                return (
                  <tr>
                    <td>
                      <form className='d-flex flex-row align-items-center'
                        onSubmit={handleUpdateShopSubcategory}
                      >
                        <input name='id' type='hidden'
                          value={subcategory.id}
                          readOnly={true}
                        />
                        <AdminFormControl name='name'
                          className='mr-2' type='text'
                          defaultValue={subcategory.name}
                        />
                        <input type='color' name='color'
                          className='mr-2'
                          defaultValue={subcategory.rgbHexLegendColor}
                        />
                        <IconButton className='p-1' iconOnly
                          type='submit' onClick={() => { }}
                        >
                          <SaveIcon />
                        </IconButton>
                      </form>
                    </td>
                    <td>
                      <span className='d-flex flex-row justify-content-end'>
                        <IconButton danger className='p-1' iconOnly
                          onClick={() => handleDeleteSubcategory(subcategory)}
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
        </AdminFormGroup>
      </Modal.Body>
      <Modal.Footer>
        <CustomButton onClick={() => props.setShow(false)}>Selesai</CustomButton>
      </Modal.Footer>
    </AdminModal>
  );
};

export default EditShopSubcategoriesModal;