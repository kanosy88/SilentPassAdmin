import "./styles.css";
import TableActiveAccount from "./compenents/TableActiveAccount";
import { useState, useEffect } from "react";
import { ChakraProvider, Container, VStack, Button } from "@chakra-ui/react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ptsmfikvgmmigtfgeurj.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0c21maWt2Z21taWd0ZmdldXJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgwNDY4MDcsImV4cCI6MTk5MzYyMjgwN30.QXTk7Qip8pkT42nQnwdQR7fc2rJML45YXIkMpHZpkA0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function App() {
  // state
  const [accountList, setAccountList] = useState([]);

  useEffect(() => {
    // Votre fonction à exécuter au lancement de la page
    fetchAccountList();
  }, []);

  const fetchAccountList = async () => {
    let { data } = await supabase.from("SilentPassKey").select();

    setAccountList(data.map((account) => account));
    console.log("Account Succesfully Fetch!");
  };

  const deleteItem = async (itemId) => {
    await supabase
      .from("SilentPassKey") // Remplacez 'table_name' par le nom de votre table
      .delete()
      .match({ id: itemId }); // Remplacez 'id' par le nom de la colonne d'identifiant unique et 'itemId' par la valeur de l'élément à supprimer
  };

  const handleDelete = (id) => {
    const accountCopy = [...accountList];
    const ListUpdate = accountCopy.filter((account) => account.id !== id);

    setAccountList(ListUpdate);
    deleteItem(id);
  };

  //affichage
  return (
    <ChakraProvider>
      <Container maxWidth="100%" mt={"50px"}>
        <VStack>
          <Button colorScheme="blue" onClick={fetchAccountList}>
            Charger les Comptes
          </Button>
          <h1>Liste de comptes</h1>
          <TableActiveAccount
            accountList={accountList}
            handleDelete={handleDelete}
          />
        </VStack>
      </Container>
    </ChakraProvider>
  );
}
