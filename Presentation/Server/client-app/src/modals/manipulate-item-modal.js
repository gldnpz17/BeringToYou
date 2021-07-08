import { Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import AdminModal from "../components/admin-modal";
import AdminFormGroup from "../components/admin-form-group";
import AdminFormControl from "../components/admin-form-control";
import CustomButton from "../components/custom-button";

const ManipulateItemModal = (props) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (props.query !== null && props.query !== undefined) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [props.query]);

  const submitForm = async () => {
    if (props.query !== null && props.query !== undefined) {
      let inputs = document.getElementsByClassName(props.query.id);
    
      let values = {};
      for (let x = 0; x < inputs.length; x++) {
        let input = inputs[x];

        values[input.id] = input.value;
      }
  
      await props.query.submit.callback(values);
  
      setShow(false);
    }
  };

  return (
    <AdminModal show={show} setShow={setShow} {...props}>
      <Modal.Header>
        <Modal.Title>{props.query?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.query?.fields.map(field => {
          return (
            <AdminFormGroup label={field.label}>
              {(() => {
                switch (field.type) {
                  case 'select':
                    return (
                      <AdminFormControl id={field.id} as='select' className={`form-select ${props.query?.id}`}>
                        {field.options.map(option => {
                          return (
                            <option value={option.value} selected={option.isDefault === true}>{option.label}</option>
                          );
                        })}
                      </AdminFormControl>
                    );
                  case 'textarea':
                    return (
                      <AdminFormControl id={field.id} 
                        as='textarea' 
                        readOnly={field.readOnly === true} 
                        className={`form-control ${props.query?.id}`} 
                        rows={5} 
                        defaultValue={field.defaultValue} 
                      />
                    );
                  case 'text':
                    return (
                      <AdminFormControl id={field.id} 
                        className={props.query?.id}
                        type='text' 
                        readOnly={field.readOnly === true} 
                        defaultValue={field.defaultValue} 
                      />
                    );
                  case 'file':
                    return (
                      <AdminFormControl id={field.id} 
                        className={props.query?.id}
                        type='file' 
                      />
                    );
                  default:
                    throw new Error('Invalid field type.');
                }
              })()}
            </AdminFormGroup>
          );
        })}
      </Modal.Body>
      <Modal.Footer>
        <CustomButton onClick={() => submitForm()}
          danger={props.query?.submit.danger === true}
        >
          {props.query?.submit.label}
        </CustomButton>
        <CustomButton secondary onClick={() => setShow(false)}>Batal</CustomButton>
      </Modal.Footer>
    </AdminModal>
  );
};

export default ManipulateItemModal;