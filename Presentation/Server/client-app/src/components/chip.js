import styled from "styled-components";
import CloseIcon from "../svg/close-icon";

const ChipContainer = styled.div`
  border-radius: 0.75rem;
  border-width: 0.1rem;
  border-color: ${props => props.theme.secondary};
  border-style: solid;

  height: 1.5rem;
`;

const RemoveChipButton = styled(CloseIcon)`
  width: 1rem;
  height: 1rem;

  border-radius: 0.5rem;
  background-color: ${props => props.theme.secondary};

  color: ${props => props.theme.secondaryLight};
`;

const Chip = ({ className, categoryId, categoryName }) => {
  return (
    <ChipContainer className={`d-inline-block px-1 d-flex flex-row align-items-center ${className}`}>
      <p className='m-0 mx-1'>{categoryName}</p>
      <RemoveChipButton />
    </ChipContainer>
  );
};

export default Chip;