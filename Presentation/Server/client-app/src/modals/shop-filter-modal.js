import { Form, Modal } from "react-bootstrap";
import AdminFormControl from "../components/admin-form-control";
import AdminFormGroup from "../components/admin-form-group";
import AdminModal from "../components/admin-modal";
import CustomButton from "../components/custom-button";
import FormCheck from "../components/form-check";

const ShopFilterModal = (props) => {
  return (
    <AdminModal {...props}>
      <Modal.Header>
        <Modal.Title>Filter Pencarian</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className='mb-3'>
          <Form.Label>Kategori</Form.Label>
          <AdminFormControl as='select'>
            <option>CatA</option>
            <option>CatB</option>
            <option>CatC</option>
          </AdminFormControl>
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Toko online</Form.Label>
          <FormCheck id='os-a' label='OnlineShop1' />
          <FormCheck id='os-b' label='OnlineShop2' />
          <FormCheck id='os-c' label='OnlineShop3' />
        </Form.Group>
        <Form.Group>
          <Form.Label>Rentang harga</Form.Label>
          <div className='d-flex align-items-center'>
            <AdminFormControl className='mr-1' type='text' />
            -
            <AdminFormControl className='ml-1' type='text' />
          </div>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <CustomButton>Terapkan</CustomButton>
        <CustomButton secondary>Batal</CustomButton>
      </Modal.Footer>
    </AdminModal>
  );
};

export default ShopFilterModal;