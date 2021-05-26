import { Card } from "react-bootstrap";
import styled from "styled-components";

const StyledCard = styled(Card)`
  box-shadow: ${props => props.theme.shadow} 0.1rem 0.2rem 0.4rem;

  transition-duration: 0.2s;

  :active,:focus,:hover {
    filter: brightness(0.7);
  }

  border: none;
  overflow: hidden;
`;

const CustomCard = (props) => {
  return (
    <StyledCard {...props} />
  );
};

export default CustomCard;