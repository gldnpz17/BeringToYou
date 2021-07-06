import styled from "styled-components";

const ItemWithIdTableCell = styled.td`
  display: flex;
  flex-direction: row;
  align-items: center;

  p {
    white-space: nowrap;
    margin: 0;
  }

  .id {
    font-size: 0.8em;

    color: gray;
  }
`;

export default ItemWithIdTableCell;