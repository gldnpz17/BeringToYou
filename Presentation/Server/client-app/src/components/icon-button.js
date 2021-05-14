import { Button } from "react-bootstrap";
import styled from "styled-components";

const StyledButton = styled(Button)`
  background-color: ${props => props.theme.secondary};
  border-color: ${props => props.theme.secondary};
  color: black;
  box-shadow: ${props => props.theme.shadow} 0rem 0.4rem 0.4rem;
`;

const ButtonText = styled.p`
  font-size: 1.25rem;
  line-height: 95%;
`;

const IconButton = ({ children, text, onClick, className }) => {
  return (
    <StyledButton className={`py-1 px-2 ${className}`} onClick={onClick}>
      <span className='d-flex flex-row align-items-center'>
        {children}
        <ButtonText className='m-0 ms-1'>{text}</ButtonText>
      </span>
    </StyledButton>
  );
};

export default IconButton;