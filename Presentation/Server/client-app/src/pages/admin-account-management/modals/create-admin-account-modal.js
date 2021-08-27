import { useSnackbar } from "notistack";
import { Modal } from "react-bootstrap";
import AdminFormControl from "../../../components/admin-form-control";
import AdminFormGroup from "../../../components/admin-form-group";
import AdminModal from "../../../components/admin-modal";
import CustomButton from "../../../components/custom-button";
import AccountManagement from "../../../use-cases/account-management";
import copyToClipboard from "../../../helpers/copy-to-clipboard";
import generateRandomString from "../../../helpers/generate-random-string";
import { useRef } from "react";
import ValidationRegexes from '../../../helpers/validation-regexes';
import IconButton from "../../../components/icon-button";
import RandomIcon from '../../../svg/random-icon';

const CreateAdminAccountModal = ({ show, setShow, ...props }) => {
  const { enqueueSnackbar } = useSnackbar();

  const formElement = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let data = new FormData(event.target);

    let response = await AccountManagement.createAdminAccount(
      data.get('username'),
      data.get('email'),
      data.get('display-name'),
      data.get('password')
    );

    if (response.status === 200) {
      enqueueSnackbar('Akun admin berhasil dibuat.', {
        variant: 'success'
      });

      setShow(false);
    } else {
      enqueueSnackbar('Akun admin gagal dibuat.', {
        variant: 'error'
      })
    }
  }

  const handleGeneratePassword = () => {
    let password = generateRandomString(12);

    document.getElementById('create-admin-account-password-field').value = password;

    copyToClipboard(password);

    enqueueSnackbar('Kata sandi tersalin ke clipboard.');
  }
  
  return (
    <AdminModal show={show} setShow={setShow} {...props} >
      <form method='POST' ref={formElement} onSubmit={handleSubmit}>
        <Modal.Header>
          <Modal.Title>Akun Admin Baru</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AdminFormGroup label='Username'>
            <AdminFormControl type='text' name='username' 
              placeholder='budibudiman123' required 
              pattern={ValidationRegexes.alphanumericString}
              minLength={8} maxLength={16}
            />
          </AdminFormGroup>
          <AdminFormGroup label='Email'>
            <AdminFormControl type='text' name='email' 
              placeholder='contoh@domain.tld' required
              pattern={ValidationRegexes.email}
              minLength={3} maxLength={128}
            />
          </AdminFormGroup>
          <AdminFormGroup label='Nama'>
            <AdminFormControl type='text' name='display-name' 
              placeholder='Budi Budiman' required
              minLength={2} maxLength={64}
            />
          </AdminFormGroup>
          <AdminFormGroup label='Kata Sandi'>
            <div className='d-flex'>
              <AdminFormControl type='password' name='password' 
                required id='create-admin-account-password-field'
                minLength={8} maxLength={32}
              />
              <IconButton className='ml-2' iconOnly
                onClick={handleGeneratePassword} >
                <RandomIcon />
              </IconButton>
            </div>
          </AdminFormGroup>
        </Modal.Body>
        <Modal.Footer>
          <CustomButton type='submit' onClick={() => {}}>Buat</CustomButton>
          <CustomButton secondary onClick={() => setShow(false)}>Batal</CustomButton>
        </Modal.Footer>
      </form>
    </AdminModal>
  );
}

export default CreateAdminAccountModal;