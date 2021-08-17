import styled from "styled-components";
import CustomButton from "./custom-button";

const ButtonText = styled.p`
  font-size: 1.25rem;
  line-height: 95%;
`;

const StyledCustomButton = styled(CustomButton)`
  svg {
    width: 1.6rem;
    height: 1.6rem;
  }
`;

const IconButton = ({ children, text, onClick, className, iconOnly, id, style, danger, ...props }) => {
  let buttonContent = null;
  if (iconOnly) {
    buttonContent = children;
  } else {
    buttonContent = (
      <span className='d-flex flex-row align-items-center'>
        {children}
        <ButtonText className='m-0 ml-1'>{text}</ButtonText>
      </span>
    );
  }

  return (
    <StyledCustomButton id={id} variant='none' style={style} className={`${iconOnly ? '' : 'py-1 px-2'} ${className}`} onClick={onClick} danger={danger} {...props}>
      {buttonContent}
    </StyledCustomButton>
  );
};

export default IconButton;