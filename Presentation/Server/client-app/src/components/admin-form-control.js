import $ from 'jquery';
import { useEffect } from "react";
import { Form } from "react-bootstrap";
import styled from "styled-components";

const FormControl = styled(Form.Control)`
  :focus {
    border-color: ${props => props.theme.secondary};
    box-shadow: 0 0 0 0.25rem ${props => props.theme.secondaryTransparent};
  }
`;

const StyledSelect = styled.select`
  &~button {
    display: block;
    width: 100%;
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;

    :focus {
      border-color: ${props => props.theme.secondary};
      box-shadow: 0 0 0 0.25rem ${props => props.theme.secondaryTransparent};
      outline: none !important;
    }
  }

  &~div.dropdown-menu {
    .bs-searchbox {
      input {
        margin-bottom: 0.5rem;

        :focus {
          border-color: ${props => props.theme.secondary};
          box-shadow: 0 0 0 0.075rem ${props => props.theme.secondaryTransparent};
        }
      }
    }

    .inner>ul>li>a {
      &.active, &:active {
        color: black;
        background-color: ${props => props.theme.secondary};
      }
    }
  }
`;

const AdminFormControl = (props) => {
  useEffect(() => {
    if (props.as === 'select') {
      $('.selectpicker').selectpicker();
      $('.selectpicker').selectpicker('refresh');
    }
  }, [props]);

  useEffect(() => {
    if (props.as === 'select') {
      $('.selectpicker').selectpicker('refresh');
    }
  }, [props.children])

  if (props.as === 'select') {
    return (
      <StyledSelect {...props} className={`selectpicker form-control ${props.className}`} />
    );
  } else {
    return (
      <FormControl {...props} />
    );
  }
};

export default AdminFormControl;