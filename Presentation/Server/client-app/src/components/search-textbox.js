import { InputGroup } from "react-bootstrap";
import styled from "styled-components";
import SearchIcon from "../svg/search-icon";
import AdminFormControl from "./admin-form-control";
import CustomButton from "./custom-button";

const StyledInputGroup = styled(InputGroup)`
  box-shadow: ${props => props.theme.shadow} 0rem 0.05rem 0.1rem;
  border-radius: 0.25rem;

  svg {
    color: ${props => props.theme.textOnPrimary};
  }
`;

const StyledSearchButton = styled(CustomButton)`
  background-color: ${props => props.theme.secondary};
  border-color: ${props => props.theme.secondary};
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  z-index: 0 !important;

  box-shadow: none;

  :active {
    transform: translateY(0rem) !important;
  }

  :focus {
    box-shadow: none ;
  }
`;

const SearchTextBox = ({ className, placeholder, onSubmit, ...props }) => {
  return (
    <form onSubmit={(event) => {
      event.preventDefault();

      onSubmit(event);
    }} className={className}>
      <StyledInputGroup>
        <AdminFormControl type='text' placeholder={placeholder} {...props} />
        <InputGroup.Append>
          <StyledSearchButton type='submit'>
            <SearchIcon style={{ width: '1.6rem', height: '1.6rem' }} />
          </StyledSearchButton>
        </InputGroup.Append>
      </StyledInputGroup>
    </form>
  );
};

export default SearchTextBox;