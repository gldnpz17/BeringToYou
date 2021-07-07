import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import AdminFormControl from "../components/admin-form-control";
import AdminFormGroup from "../components/admin-form-group";
import AdminModal from "../components/admin-modal";
import CustomButton from "../components/custom-button";

const DeleteItemModal = (props) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (props.item !== null && props.item !== undefined) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [props.item]);

  return (
    <AdminModal show={show} {...props}>
      <Modal.Header>
        <Modal.Title>Hapus Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.item?.properties.map(property => {
          return (
            <AdminFormGroup label={property.label}>
              <AdminFormControl type='text' readOnly defaultValue={property.value} />
            </AdminFormGroup>
          );
        })}
      </Modal.Body>
      <Modal.Footer>
        <CustomButton danger 
          onClick={() => {
            props.item?.callback();
            setShow(false);
          }
        }>Hapus</CustomButton>
        <CustomButton secondary onClick={() => setShow(false)}>Batal</CustomButton>
      </Modal.Footer>
    </AdminModal>
  );
};

export default DeleteItemModal;