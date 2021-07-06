import styled from "styled-components";
import ItemWithIdTableCell from "./item-with-id-table-cell";

const AccountIdentityTableCell = styled(ItemWithIdTableCell)`
  display: flex;
  flex-direction: row;
  align-items: center;

  .profile-picture {
    height: 2.4rem;
    width: 2.4rem;

    border-radius: 50%;

    margin-right: 0.4rem;
  }

  .account-id {
    font-size: 0.8em;

    color: gray;
  }
`;

export default AccountIdentityTableCell;