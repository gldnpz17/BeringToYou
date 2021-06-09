import { Button, FormControl, InputGroup } from "react-bootstrap";
import styled from "styled-components";
import SearchIcon from "../svg/search-icon";
import CustomButton from "./custom-button";

const StyledInputGroup = styled(InputGroup)`
  box-shadow: ${props => props.theme.shadow} 0rem 0.05rem 0.1rem;
  border-radius: 0.25rem;

  svg {
    color: black;
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

const SearchTextBox = ({ className, placeholder }) => {
  return (
    <StyledInputGroup className={`${className}`}>
      <FormControl placeholder={placeholder} />
      <InputGroup.Append>
        <StyledSearchButton>
          <SearchIcon style={{width: '1.6rem', height: '1.6rem'}} />
        </StyledSearchButton>
      </InputGroup.Append>
    </StyledInputGroup>
  );
};

export default SearchTextBox;