import { Form, Modal } from "react-bootstrap";
import AdminFormControl from "../../components/admin-form-control";
import AdminModal from "../../components/admin-modal";
import createWhatsappContact from "../../use-cases/admin/shop/create-whatsapp-contact";
import { useSnackbar } from "notistack";
import AdminFormGroup from "../../components/admin-form-group";
import CustomButton from "../../components/custom-button";

const AddWhatsappContactModal = ({ shopId, setShow, ...props }) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (event) => {
    event.preventDefault();

    let data = new FormData(event.target);

    let response = await createWhatsappContact(
      shopId,
      data.get('phone-number')
    );

    if (response.status === 200) {
      enqueueSnackbar('Nomor whatsapp berhasil ditambahkan.', {
        variant: 'success'
      });

      setShow(false);
    } else {
      enqueueSnackbar('Nomor whatsapp gagal ditambahkan.', {
        variant: 'error'
      });

      event.target.reset();
    }
  }

  return (
    <AdminModal {...props}>
      <form method='POST' onSubmit={handleSubmit}>
        <Modal.Header>
          <Modal.Title>Tambah Kontak Whatsapp</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AdminFormGroup label='Nomor telepon'>
            <AdminFormControl name='phone-number' type='text' 
              placeholder='082201234567' required
            />
          </AdminFormGroup>
        </Modal.Body>
        <Modal.Footer>
          <CustomButton type='submit' onClick={() => {}}>Tambahkan</CustomButton>
        </Modal.Footer>
      </form>
    </AdminModal>
  );
};

export default AddWhatsappContactModal;