import { Table } from "react-bootstrap";
import styled from "styled-components";

const TableContainer = styled.div`
  position: relative;

  overflow: scroll;
`;

const AdminTable = (props) => {
  return (
    <TableContainer style={{height: props.tableHeight ?? '18rem'}}>
      <Table style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}} hover striped bordered {...props}>
        {props.children}
      </Table>
    </TableContainer>
  );
};

export default AdminTable;