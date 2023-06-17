import "./styles.css";
import { useState, useEffect } from "react";
import {
  Badge,
  ChakraProvider,
  Container,
  VStack,
  Button,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Box,
  TableContainer
} from "@chakra-ui/react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ptsmfikvgmmigtfgeurj.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0c21maWt2Z21taWd0ZmdldXJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgwNDY4MDcsImV4cCI6MTk5MzYyMjgwN30.QXTk7Qip8pkT42nQnwdQR7fc2rJML45YXIkMpHZpkA0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function App() {
  // state
  const [Account, setAccount] = useState("Email, Password");
  const [InputKey, setInputKey] = useState("");
  const [accountList, setAccountList] = useState([]);

  useEffect(() => {
    // Votre fonction à exécuter au lancement de la page
    fetchAccountList();
    // Vous pouvez placer votre code ici
  }, []);

  const handleChange = (event) => {
    setInputKey(event.target.value);
  };

  const fetchAccount = async () => {
    let { data } = await supabase
      .from("SilentPassKey")
      .select()
      .eq("key", InputKey);

    let AccountData = data[0];

    if (AccountData) {
      console.log(AccountData.key, AccountData.email, AccountData.password);
      setAccount(
        "Email: " + AccountData.email + " Password: " + AccountData.password
      );
    } else {
      console.log("Key don't exist");
      setAccount("Email: ? Password: ?");
    }
  };

  const fetchAccountList = async () => {
    let { data } = await supabase.from("SilentPassKey").select();

    setAccountList(data.map((account) => account));
    console.log("Account Succesfully Fetch!");
  };

  const deleteItem = async (itemId) => {
    const { data } = await supabase
      .from("SilentPassKey") // Remplacez 'table_name' par le nom de votre table
      .delete()
      .match({ id: itemId }); // Remplacez 'id' par le nom de la colonne d'identifiant unique et 'itemId' par la valeur de l'élément à supprimer
  };

  const handleDelete = (id) => {
    console.log(id);
    const accountCopy = [...accountList];

    const ListUpdate = accountCopy.filter((account) => account.id !== id);

    setAccountList(ListUpdate);
    deleteItem(id);
  };

  //affichage
  return (
    <ChakraProvider>
      <Container maxWidth="100%">
        <VStack>
          <Button colorScheme="blue" onClick={fetchAccountList}>
            Charger les Comptes
          </Button>
          <h1>Votre Compte</h1>
          <h2>{Account}</h2>
          <input type="text" onChange={handleChange} />
          <Button colorScheme="blue" onClick={fetchAccount}>
            Prendre un nouveau Compte
          </Button>
          <h1>Liste de comptes</h1>
          <Badge>Default</Badge>
          <TableContainer>
            <Table variant="default" size="sm">
              <Thead>
                <Tr>
                  <Th>Status</Th>
                  <Th>Account Type</Th>
                  <Th>User</Th>
                  <Th>Email</Th>
                  <Th>Password</Th>
                </Tr>
              </Thead>
              <Tbody>
                {accountList.map((account) => (
                  <Tr>
                    <Badge colorScheme="teal">Active</Badge>
                    <Td>{account.account_type}</Td>
                    <Td>{account.discord_user}</Td>
                    <Td>{account.email}</Td>
                    <Td>{account.password}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </VStack>
      </Container>
    </ChakraProvider>
  );
}
