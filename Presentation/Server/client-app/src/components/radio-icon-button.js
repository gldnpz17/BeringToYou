import { useEffect } from "react";
import styled from "styled-components";
import CustomButton from "./custom-button";
import IconButton from "./icon-button";

const StyledRadioIconButton = styled(IconButton)`
  &.selected {
    background-color: ${props => props.theme.secondaryDark};
    border-color: ${props => props.theme.secondaryDark};

    transform: scale(0.95);
  }
`;

const RadioIconButton = ({ id, selectedId, children, text, onClick, className, iconOnly }) => {
  useEffect(() => {
    if (selectedId !== undefined && id !== undefined) {
      if (selectedId === id) {
        document.getElementById(id).classList.add('selected');
      } else {
        document.getElementById(id).classList.remove('selected');
      }
    }
  }, [selectedId]);

  return (
    <StyledRadioIconButton id={id} text={text} onClick={onClick} className={className} iconOnly={iconOnly}>
      {children}
    </StyledRadioIconButton>
  );
};

export default RadioIconButton;