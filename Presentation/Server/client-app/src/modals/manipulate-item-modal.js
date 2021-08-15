import { Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import AdminModal from "../components/admin-modal";
import AdminFormGroup from "../components/admin-form-group";
import AdminFormControl from "../components/admin-form-control";
import CustomButton from "../components/custom-button";
import ImageListControl from "../components/image-list-control";
import FormCheck from "../components/form-check";

const ManipulateItemModal = (props) => {
  const [show, setShow] = useState(false);
  const [formImages, setFormImages] = useState({});

  useEffect(() => {
    if (props.query !== null && props.query !== undefined) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [props.query]);

  const gatherInputValues = () => {
    let inputs = document.getElementsByClassName(props.query.id);
    
    let values = {};
    for (let x = 0; x < inputs.length; x++) {
      let input = inputs[x];
      switch(input.type) {
        case 'file':
          values[input.name] = input.files[0];
          break;      
        case 'checkbox':
          if (!values[input.name]) {
            values[input.name] = {}
          }
          (values[input.name])[input.id] = input.checked;
          break;
        default:
          values[input.name] = input.value;
          break;
      }
    }

    return values;
  };

  const setImageList = (id) => {
    return (newList) => {
      let newFormSubmission = {...formImages};

      newFormSubmission[id] = newList;

      setFormImages(newFormSubmission);
    };
  };

  const submitForm = async () => {
    if (props.query !== null && props.query !== undefined) {
      let inputValues = gatherInputValues();
  
      await props.query.submit.callback({...formImages, ...inputValues});
  
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
                      <AdminFormControl name={field.id} as='select' className={`${props.query?.id}`}>
                        {field.options.map(option => {
                          return (
                            <option value={option.value} selected={option.isDefault === true}>{option.label}</option>
                          );
                        })}
                      </AdminFormControl>
                    );
                  case 'textarea':
                    return (
                      <AdminFormControl name={field.id} 
                        as='textarea' 
                        readOnly={field.readOnly === true} 
                        className={`form-control ${props.query?.id}`} 
                        rows={5} 
                        defaultValue={field.defaultValue} 
                      />
                    );
                  case 'text':
                    return (
                      <AdminFormControl name={field.id} 
                        className={props.query?.id}
                        type='text' 
                        readOnly={field.readOnly === true} 
                        defaultValue={field.defaultValue} 
                      />
                    );
                  case 'password':
                    return (
                      <AdminFormControl name={field.id} 
                        className={props.query?.id}
                        type='password' 
                      />
                    );
                  case 'file':
                    return (
                      <div className='d-flex flex-column'>
                        {(field.preview !== null && field.preview !== undefined) ? <a href={field.preview} target="_blank">File lama</a> : null}
                        <AdminFormControl name={field.id} 
                          className={props.query?.id}
                          type='file' 
                        />
                      </div>
                    );
                  case 'image-list':
                    return (
                      <ImageListControl 
                        initialImages={field.initialImages}
                        images={formImages[field.id]}
                        setImages={setImageList(field.id)}
                      />
                    );
                  case 'checkbox':
                    field.options?.map(option => {
                      return (
                        <FormCheck 
                          id={option.id}
                          name={field.id}
                          className={props.query?.id}
                          defaultChecked={option.defaultChecked === true}
                        />
                      ) ?? null;
                    });
                    break;
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