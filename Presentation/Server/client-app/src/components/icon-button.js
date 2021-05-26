import { Button } from "react-bootstrap";
import styled from "styled-components";
import CustomButton from "./custom-button";

const ButtonText = styled.p`
  font-size: 1.25rem;
  line-height: 95%;
`;

const IconButton = ({ children, text, onClick, className, iconOnly, id }) => {
  let buttonContent = null;
  if (iconOnly) {
    buttonContent = children;
  } else {
    buttonContent = (
      <span className='d-flex flex-row align-items-center'>
        {children}
        <ButtonText className='m-0 ms-1'>{text}</ButtonText>
      </span> 
    );
  }

  return (
    <CustomButton id={id} variant='none' className={`${iconOnly ? '' : 'py-1 px-2'} ${className}`} onClick={onClick}>
      {buttonContent}
    </CustomButton>
  );
};

export default IconButton;