import { Modal } from "react-bootstrap";
import AdminFormControl from "../../components/admin-form-control";
import AdminFormGroup from "../../components/admin-form-group";
import AdminModal from "../../components/admin-modal";
import CustomButton from "../../components/custom-button";
import createLegend from '../../use-cases/admin/map/create-legend';
import updateLegend from '../../use-cases/admin/map/update-legend';
import uploadImage from "../../use-cases/common/upload-image";
import { useSnackbar } from "notistack";

const CreateUpdateMapLegendModal = ({ legendToUpdate, show, setShow, ...props }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  let mode = legendToUpdate ? 'update' : 'create';

  const handleCreate = async (event) => {
    event.preventDefault();

    let data = new FormData(event.target);

    let response = await createLegend(data.get('label'));

    if (response.status === 200) {
      enqueueSnackbar('Legenda berhasil ditambahkan.', {
        variant: 'success'
      });
    } else {
      enqueueSnackbar('Legenda gagal ditambahkan.', {
        variant: 'error'
      });
    }

    setShow(false);
  }

  const handleUpdate = async (event) => {
    event.preventDefault();

    let data = new FormData(event.target);

    let updateResponse = await updateLegend(
      data.get('id'),
      data.get('label')
    );

    let iconUploadSuccessful = true;
    if (data.get('icon').size > 0) {
      let iconUploadResponse = await uploadImage(
        `/api/map/legends/${data.get('id')}/icon`,
        'icon',
        data.get('icon'),
        'PUT',
        512
      );

      if (iconUploadResponse.status !== 200) {
        iconUploadSuccessful = false;
      }
    }

    if (updateResponse.status === 200 && iconUploadSuccessful) {
      enqueueSnackbar('Perubahan legenda tersimpan.', {
        variant: 'success'
      });
    } else {
      enqueueSnackbar('Gagal menyimpan perubahan legenda.', {
        variant: 'error'
      });
    }

    setShow(false);
  }

  return (
    <AdminModal show={show} setShow={setShow} {...props}>
      <form method='POST'
        onSubmit={(event) => {
          switch (mode) {
            case 'create':
              handleCreate(event);
              break;
            case 'update':
              handleUpdate(event);
              break;
          }
        }}
      >
        <Modal.Header>
          <Modal.Title>
            {(() => {
              switch (mode) {
                case 'create':
                  return ('Tambah Legenda baru')
                case 'update':
                  return ('Ubah Legenda')
              }
            })()}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {mode === 'update' &&
            <AdminFormGroup label='ID'>
              <AdminFormControl type='text' name='id' readOnly
                defaultValue={legendToUpdate.id}
              />
            </AdminFormGroup>
          }
          <AdminFormGroup label='Label'>
            <AdminFormControl type='text' name='label' required
              defaultValue={(() => {
                switch (mode) {
                  case 'create':
                    return '';
                  case 'update':
                    return legendToUpdate.label;
                }
              })()}
            />
          </AdminFormGroup>
          {mode === 'update' &&
            <AdminFormGroup label='icon'>
              <div className='d-flex flex-column'>
                <a
                  target='_blank'
                  href={`/api/public/assets/${legendToUpdate.iconFilename}`}
                >
                  File Lama
                </a>
                <AdminFormControl type='file' name='icon' readOnly />
              </div>
            </AdminFormGroup>
          }
        </Modal.Body>
        <Modal.Footer>
          <CustomButton type='submit' onClick={() => { }}>
            {(() => {
              switch (mode) {
                case 'create':
                  return 'Tambahkan';
                case 'update':
                  return 'Simpan';
              }
            })()}
          </CustomButton>
          <CustomButton secondary onClick={() => setShow(false)}>Batal</CustomButton>
        </Modal.Footer>
      </form>
    </AdminModal>
  );
};

export default CreateUpdateMapLegendModal;