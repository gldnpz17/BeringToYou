import { Modal } from "react-bootstrap";
import AdminFormControl from "../components/admin-form-control";
import AdminFormGroup from "../components/admin-form-group";
import AdminModal from "../components/admin-modal";
import CustomButton from "../components/custom-button";
import ImageSlideshow from '../components/image-slideshow';
import rejectMerchant from '../use-cases/admin/account-management/reject-merchant';
import verifyMerchant from '../use-cases/admin/account-management/verify-merchant';

const VerifyMerchantModal = ({ verificationRequest, callback, ...props }) => {
  const handleVerify = async () => {
    await verifyMerchant(verificationRequest.account.id);

    await callback();

    props.setShow(false);
  };

  const handleReject = async () => {
    await rejectMerchant(verificationRequest.account.id);

    await callback();

    props.setShow(false);
  };

  return (
    <AdminModal size='lg' {...props}>
      <Modal.Header>
        <Modal.Title>Verifikasi Akun Pedagang</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AdminFormGroup label='ID'>
          <AdminFormControl readOnly type='text' defaultValue={verificationRequest?.account.id} />
        </AdminFormGroup>
        <AdminFormGroup label='Nama'>
          <AdminFormControl readOnly type='text' defaultValue={verificationRequest?.account.displayName} />
        </AdminFormGroup>
        <AdminFormGroup label='Verifikasi sebelum'>
          <AdminFormControl readOnly type='text' defaultValue={verificationRequest?.expired} />
        </AdminFormGroup>
        <AdminFormGroup label='Toko'>
          <ul>
            {verificationRequest?.ownedShops.map(shop => {
              return (
                <li>{shop.name}</li>
              );
            })}
          </ul>
        </AdminFormGroup>
        <AdminFormGroup label='Foto bukti'>
          <ImageSlideshow height='16rem'
            images={verificationRequest?.verificationPhotoFilenames.map(filename => {
              return (`/api/merchant/verification-requests/${verificationRequest.account.id}/photos/${filename}`);
            })} />
        </AdminFormGroup>
      </Modal.Body>
      <Modal.Footer>
        <CustomButton onClick={handleVerify}>Verifikasi</CustomButton>
        <CustomButton danger onClick={handleReject}>Tolak</CustomButton>
        <CustomButton secondary onClick={() => props.setShow(false)}>Batal</CustomButton>
      </Modal.Footer>
    </AdminModal>
  );
};

export default VerifyMerchantModal;