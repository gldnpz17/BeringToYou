import { Modal } from "react-bootstrap";
import AdminModal from "../../components/admin-modal";
import CustomButton from "../../components/custom-button";

const AttributionsModal = ({ setShow, ...props }) => {
  return (
    <AdminModal setShow={setShow} {...props}>
      <Modal.Header>
        <Modal.Title>Atribusi</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className='text-center'>© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a></p>
        <p className='text-center'>© <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a></p>
        <p className='text-center'><strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong></p>
      </Modal.Body>
      <Modal.Footer>
        <CustomButton onClick={() => setShow(false)}>Baik</CustomButton>
      </Modal.Footer>
    </AdminModal>
  )
};

export default AttributionsModal;