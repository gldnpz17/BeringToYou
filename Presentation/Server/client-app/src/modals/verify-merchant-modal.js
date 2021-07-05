import AdminModal from "../components/admin-modal";
import { Form, Modal, Row, Col } from "react-bootstrap";
import AdminFormControl from "../components/admin-form-control";
import AdminFormGroup from "../components/admin-form-group";
import ImageSlideshow from '../components/image-slideshow';
import CustomButton from "../components/custom-button";

const VerifyMerchantModal = (props) => {
  return (
    <AdminModal size='lg' {...props}>
      <Modal.Header>
        <Modal.Title>Verifikasi Akun Pedagang</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AdminFormGroup label='ID'>
          <AdminFormControl readOnly type='text' defaultValue='Lorem Ipsum' />
        </AdminFormGroup>
        <AdminFormGroup label='Verifikasi sebelum'>
          <AdminFormControl readOnly type='text' defaultValue='1 April 2021' />
        </AdminFormGroup>
        <AdminFormGroup label='Nama'>
          <AdminFormControl readOnly type='text' defaultValue='Lorem Ipsum' />
        </AdminFormGroup>
        <AdminFormGroup label='Toko'>
          <ul>
            <li>Toko Lorem Ipsum</li>
            <li>Warung Dolor Sit Amet</li>
          </ul>
        </AdminFormGroup>
        <AdminFormGroup label='Foto bukti'>
          <ImageSlideshow height='16rem' images={[
            '/dummy-images/person-1.jpg',
            '/dummy-images/person-2.jpg'
          ]}/>
        </AdminFormGroup>
      </Modal.Body>
      <Modal.Footer>
        <CustomButton>Verifikasi</CustomButton>
        <CustomButton secondary onClick={() => props.setShow(false)}>Batal</CustomButton>
      </Modal.Footer>
    </AdminModal>
  );
};

export default VerifyMerchantModal;