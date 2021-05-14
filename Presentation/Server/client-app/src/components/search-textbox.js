import { Button, FormControl, InputGroup } from "react-bootstrap";
import styled from "styled-components";
import SearchIcon from "../svg/search-icon";

const StyledInputGroup = styled(InputGroup)`
  box-shadow: ${props => props.theme.shadow} 0rem 0.1rem 0.3rem;

  svg {
    color: black;
  }
`;

const StyledSearchButton = styled(Button)`
  background-color: ${props => props.theme.secondary};
  border-color: ${props => props.theme.secondary};
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
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