import { useEffect, useState } from "react"
import { Modal, Form } from "react-bootstrap"
import AdminFormControl from "../components/admin-form-control"
import AdminFormGroup from "../components/admin-form-group"
import AdminModal from "../components/admin-modal"
import CustomButton from "../components/custom-button"
import fetchAllShopCategories from '../use-cases/common/fetch-all-shop-categories'

const CreateShopModal = (props) => {
  const [shopCategories, setShopCategories] = useState([]);

  useEffect(() => {
    getShopCategories();
  }, [props.show]);

  const getShopCategories = async () => setShopCategories(await fetchAllShopCategories());

  return (
    <AdminModal {...props}>
      <Modal.Header>
        <Modal.Title>Tambahkan Toko Baru</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <AdminFormGroup label='Nama'>
            <AdminFormControl type='text' />
          </AdminFormGroup>
          <AdminFormGroup label='Deskripsi'>
            <AdminFormControl as='textarea' className='form-control' rows={5} />
          </AdminFormGroup>
          <AdminFormGroup label='Lantai'>
            <AdminFormControl type='text' />
          </AdminFormGroup>
          <AdminFormGroup label='Latitude'>
            <AdminFormControl type='text' />
          </AdminFormGroup>
          <AdminFormGroup label='Longitude'>
            <AdminFormControl type='text' />
          </AdminFormGroup>
          <AdminFormGroup label='Kategori'>
            <AdminFormControl as='select' className='form-select'>
              {shopCategories.map(category => {
                return (
                  <option>{category?.name}</option>
                );
              })}
            </AdminFormControl>
          </AdminFormGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <CustomButton>Tambahkan</CustomButton>
        <CustomButton secondary onClick={() => props.setShow(false)}>Batal</CustomButton>
      </Modal.Footer>
    </AdminModal>
  );
};

export default CreateShopModal;