import { useEffect, useState } from "react";
import { Modal, Form } from "react-bootstrap";
import AdminFormControl from "../components/admin-form-control";
import AdminFormGroup from "../components/admin-form-group";
import AdminModal from "../components/admin-modal";
import CustomButton from "../components/custom-button";
import fetchAllPointOfInterestCategories from "../use-cases/common/fetch-all-point-of-interest-categories";

const CreatePointOfInterestModal = (props) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, [props.show])

  const getCategories = async () => setCategories(await fetchAllPointOfInterestCategories());

  return (
    <AdminModal {...props}>
      <Modal.Header>
        <Modal.Title>Tambahkan Point of Interest</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
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
              {categories.map(category => {
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

export default CreatePointOfInterestModal;