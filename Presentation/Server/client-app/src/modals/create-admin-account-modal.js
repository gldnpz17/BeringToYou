import { Form, Modal, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import AdminFormControl from "../components/admin-form-control";
import CustomButton from "../components/custom-button";
import AdminModal from '../components/admin-modal';
import AdminFormGroup from '../components/admin-form-group';

const CreateAdminAccountModal = (props) => {
  return (
    <AdminModal {...props}>
      <Modal.Header>
        <Modal.Title>Buat Akun Admin Baru</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <AdminFormGroup label='Email'>
            <AdminFormControl type='text' />
          </AdminFormGroup>
          <AdminFormGroup label='Nama'>
            <AdminFormControl type='text' />
          </AdminFormGroup>
          <AdminFormGroup label='Kata sandi'>
            <AdminFormControl type='password' />
          </AdminFormGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <CustomButton>Buat akun</CustomButton>
        <CustomButton secondary onClick={() => props.setShow(false)}>Batal</CustomButton>
      </Modal.Footer>
    </AdminModal>
  );
};

export default CreateAdminAccountModal;