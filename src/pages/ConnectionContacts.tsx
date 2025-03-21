import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import useContacts from "../hooks/useContacts";
import useConnections from "../hooks/useConnections";
import Navbar from "../components/Navbar";
import { Contact } from "../Types";

const ConnectionContacts: React.FC = () => {
  const { connectionId } = useParams<{ connectionId: string }>();
  const { getContactsByConnectionId, removeContact } = useContacts();
  const { connections } = useConnections();

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [connectionName, setConnectionName] = useState("");

  useEffect(() => {
    const fetchContacts = async () => {
      if (connectionId) {
        const contactsData = await getContactsByConnectionId(connectionId);
        setContacts(contactsData);

        const connection = connections.find((conn) => conn.id === connectionId);
        if (connection) {
          setConnectionName(connection.name);
        }
      }
    };

    fetchContacts();
  }, [connectionId, connections, getContactsByConnectionId]);

  return (
    <>
      <Navbar />
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Contatos da Conexão: {connectionName}
        </Typography>

        <List>
          {contacts.map((contact) => (
            <ListItem
              key={contact.id}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => removeContact(contact.id)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText
                primary={contact.name}
                secondary={`Telefone: ${contact.phone}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
};

export default ConnectionContacts;
