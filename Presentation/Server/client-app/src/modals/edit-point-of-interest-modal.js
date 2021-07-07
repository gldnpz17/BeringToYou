import { useEffect, useState } from "react";
import { Modal, Form } from "react-bootstrap";
import AdminFormControl from "../components/admin-form-control";
import AdminFormGroup from "../components/admin-form-group";
import AdminModal from "../components/admin-modal";
import fetchAllPointOfInterestCategories from "../use-cases/common/fetch-all-point-of-interest-categories";

const EditPointOfInterestModal = (props) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, [props.show])

  const getCategories = async () => setCategories(await fetchAllPointOfInterestCategories());

  return (
    <AdminModal {...props}>
      <Modal.Header>
        <Modal.Title>Ubah Point of Interest</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <AdminFormGroup label='ID'>
            <AdminFormControl type='text' readOnly defaultValue={props.pointOfInterest?.id} />
          </AdminFormGroup>
          <AdminFormGroup label='Lantai'>
            <AdminFormControl type='text' defaultValue={props.pointOfInterest?.floorNumber} />
          </AdminFormGroup>
          <AdminFormGroup label='Latitude'>
            <AdminFormControl type='text' defaultValue={props.pointOfInterest?.latitude} />
          </AdminFormGroup>
          <AdminFormGroup label='Longitude'>
            <AdminFormControl type='text' defaultValue={props.pointOfInterest?.longitude} />
          </AdminFormGroup>
          <AdminFormGroup label='Kategori'>
            <AdminFormControl as='select' className='form-select'>
              {categories.map(category => {
                return (
                  <option selected={props.pointOfInterest?.category.id == category?.id}>{category?.name}</option>
                );
              })}
            </AdminFormControl>
          </AdminFormGroup>
        </Form>
      </Modal.Body>
    </AdminModal>
  );
};

export default EditPointOfInterestModal;