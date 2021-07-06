import { useEffect, useState } from "react";
import { Modal, Form, Overlay } from "react-bootstrap";
import AdminFormControl from "../components/admin-form-control";
import AdminFormGroup from "../components/admin-form-group";
import AdminModal from "../components/admin-modal";
import CustomButton from "../components/custom-button";
import fetchAllMapFloors from "../use-cases/common/fetch-all-map-floors";

const EditOverlayModal = (props) => {
  const [floors, setFloors] = useState([]);
  
  useEffect(() => {
    getAllFloors();
  }, [props.overlay])

  const getAllFloors = async () => setFloors(await fetchAllMapFloors());

  return (
    <AdminModal {...props}>
      <Modal.Header>
        <Modal.Title>Ubah overlay</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <AdminFormGroup label='ID'>
            <AdminFormControl type='text' readOnly defaultValue={props.overlay?.id} />
          </AdminFormGroup>
          <AdminFormGroup label='Nama'>
            <AdminFormControl type='text' defaultValue={props.overlay?.name} />
          </AdminFormGroup>
          <AdminFormGroup label='Lantai'>
            <AdminFormControl as='select' className='form-select'>
              {floors.map(floor => {
                return (
                  <option selected={floor.floorNumber === props.overlay?.floorNumber}>{floor.floorNumber}</option>
                );
              })}
            </AdminFormControl>
          </AdminFormGroup>
          <AdminFormGroup label='Z-Index'>
            <AdminFormControl type='text' defaultValue={props.overlay?.zIndex} />
          </AdminFormGroup>
          <AdminFormGroup label='File KML'>
            <AdminFormControl type='file' />
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

export default EditOverlayModal;