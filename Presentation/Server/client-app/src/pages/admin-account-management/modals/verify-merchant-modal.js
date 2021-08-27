import { Modal } from "react-bootstrap";
import AdminFormControl from "../../../components/admin-form-control";
import AdminFormGroup from "../../../components/admin-form-group";
import AdminModal from "../../../components/admin-modal";
import AccountManagement from "../../../use-cases/account-management";
import ImageSlideshow from '../../../components/image-slideshow';
import CustomButton from "../../../components/custom-button";
import { useSnackbar } from "notistack";
import DateTimeUtil from '../../../helpers/date-time-util';

const VerifyMerchantModal = ({ verificationRequest, show, setShow, ...props }) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleVerify = async () => {
    let response = await AccountManagement.verifyMerchantVerificationRequest(verificationRequest.account.id);

    if (response.status === 200) {
      enqueueSnackbar(`Akun ${verificationRequest.account.displayName} terverifikasi.`, {
        variant: 'success'
      })

      setShow(false);
    } else {
      enqueueSnackbar('Verifikasi gagal.', {
        variant: 'error'
      })
    }
  };

  const handleReject = async () => {
    if (window.confirm('Menolak permintaan verifikasi akan menghapus akun. Apa anda yakin?')) {
      let response = await AccountManagement.rejectMerchantVerificationRequest(verificationRequest.account.id);

      if (response.status === 200) {
        enqueueSnackbar('Permintaan verifikasi tertolak dan akun terhapus.', {
          variant: 'success'
        })

        setShow(false);
      } else {
        enqueueSnackbar('Gagal menolak permintaan verifikasi.', {
          variant: 'error'
        })
      }
    }
  };

  if (verificationRequest) {
    return (
      <AdminModal show={show} setShow={setShow} size='lg' {...props}>
        <Modal.Header>
          <Modal.Title>Verifikasi Akun Pedagang</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AdminFormGroup label='ID'>
            <AdminFormControl readOnly type='text' defaultValue={verificationRequest.account.id} />
          </AdminFormGroup>
          <AdminFormGroup label='Nama'>
            <AdminFormControl readOnly type='text' defaultValue={verificationRequest.account.displayName} />
          </AdminFormGroup>
          <AdminFormGroup label='Verifikasi sebelum'>
            <AdminFormControl readOnly type='text' defaultValue={DateTimeUtil.formatDateTime(verificationRequest.expired)} />
          </AdminFormGroup>
          <AdminFormGroup label='Toko'>
            <ul>
              {verificationRequest.ownedShops.map(shop => {
                return (
                  <li key={shop.id}>{shop.name}</li>
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
          <CustomButton secondary onClick={() => setShow(false)}>Batal</CustomButton>
        </Modal.Footer>
      </AdminModal>
    );
  } else {
    return null;
  }
};

export default VerifyMerchantModal;