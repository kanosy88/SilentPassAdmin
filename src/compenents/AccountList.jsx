import { Badge, Button, Tr, Td } from "@chakra-ui/react";

export default function AccountList(props) {
  // state
  const account = props.accountInfo;
  const handleDelete = props.onAccountDelete;

  // comportement

  //affichage

  return (
    <Tr>
      <Badge colorScheme="teal">Active</Badge>
      <Td>{account.account_type}</Td>
      <Td id={"Key"}>{account.key}</Td>
      <Td>{account.discord_user}</Td>
      <Td>{account.email}</Td>
      <Td>{account.password}</Td>
      <Td>
        <Button colorScheme={"red"} onClick={() => handleDelete(account.id)}>
          Delete
        </Button>
      </Td>
    </Tr>
  );
}
