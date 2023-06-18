import { Badge, Button, Tr, Td } from "@chakra-ui/react";

export default function AccountList({ accountInfo, onAccountDelete }) {
  // state

  // comportement

  //affichage

  return (
    <Tr>
      <Badge colorScheme="teal">Active</Badge>
      <Td>{accountInfo.account_type}</Td>
      <Td id={"Key"}>{accountInfo.key}</Td>
      <Td>{accountInfo.discord_user}</Td>
      <Td>{accountInfo.email}</Td>
      <Td>{accountInfo.password}</Td>
      <Td>
        <Button
          colorScheme={"red"}
          onClick={() => onAccountDelete(accountInfo.id)}
        >
          Delete
        </Button>
      </Td>
    </Tr>
  );
}
