import { Table, Thead, Tbody, Tr, Th, TableContainer } from "@chakra-ui/react";

import AccountList from "./AccountList";

export default function TableActiveAccount(props) {
  // state
  const accountList = props.accountList;
  const handleDelete = props.handleDelete;

  // comportement

  //affichage
  return (
    <TableContainer>
      <Table mb={"10px"} variant="default" size="sm">
        <Thead>
          <Tr>
            <Th>Status</Th>
            <Th>Account Type</Th>
            <Th>Key</Th>
            <Th>User</Th>
            <Th>Email</Th>
            <Th>Password</Th>
          </Tr>
        </Thead>
        <Tbody>
          {accountList.map((account) => (
            <AccountList accountInfo={account} onAccountDelete={handleDelete} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
