import { useEffect, useState } from "react"
import { Modal, Form } from "react-bootstrap"
import AdminFormControl from "../components/admin-form-control"
import AdminFormGroup from "../components/admin-form-group"
import AdminModal from "../components/admin-modal"
import CustomButton from "../components/custom-button"
import fetchAllShopCategories from '../use-cases/common/fetch-all-shop-categories'

const EditShopModal = (props) => {
  const [shopCategories, setShopCategories] = useState([]);

  useEffect(() => {
    getShopCategories();
  }, [props.shop]);

  const getShopCategories = async () => setShopCategories(await fetchAllShopCategories());

  return (
    <AdminModal {...props}>
      <Modal.Header>
        <Modal.Title>Ubah Toko</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <AdminFormGroup label='ID'>
            <AdminFormControl type='text' readOnly defaultValue={props.shop?.id} />
          </AdminFormGroup>
          <AdminFormGroup label='Nama'>
            <AdminFormControl type='text' defaultValue={props.shop?.name} />
          </AdminFormGroup>
          <AdminFormGroup label='Deskripsi'>
            <AdminFormControl as='textarea' className='form-control' rows={5} defaultValue={props.shop?.description} />
          </AdminFormGroup>
          <AdminFormGroup label='Lantai'>
            <AdminFormControl type='text' defaultValue={props.shop?.floor} />
          </AdminFormGroup>
          <AdminFormGroup label='Latitude'>
            <AdminFormControl type='text' defaultValue={props.shop?.latitude} />
          </AdminFormGroup>
          <AdminFormGroup label='Longitude'>
            <AdminFormControl type='text' defaultValue={props.shop?.longitude} />
          </AdminFormGroup>
          <AdminFormGroup label='Kategori'>
            <AdminFormControl as='select' className='form-select'>
              {shopCategories.map(category => {
                return (
                  <option selected={category?.name === props.shop?.shopCategoryName}>{category?.name}</option>
                );
              })}
            </AdminFormControl>
          </AdminFormGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <CustomButton>Simpan</CustomButton>
        <CustomButton secondary onClick={() => props.setShow(false)}>Batal</CustomButton>
      </Modal.Footer>
    </AdminModal>
  );
};

export default EditShopModal;