import styled from "styled-components";

const AccountIdentityTableCell = styled.td`
  display: flex;
  flex-direction: row;
  align-items: center;

  .profile-picture {
    height: 2.4rem;
    width: 2.4rem;

    border-radius: 50%;

    margin-right: 0.4rem;
  }

  p {
    white-space: nowrap;
    margin: 0;
  }

  .account-id {
    font-size: 0.8em;

    color: gray;
  }
`;

export default AccountIdentityTableCell;