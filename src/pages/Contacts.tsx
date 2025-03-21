import {
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import DeleteIcon from "@mui/icons-material/Delete";
import useContacts from "../hooks/useContacts";
import useConnections from "../hooks/useConnections";
import Navbar from "../components/Navbar";
import { useState } from "react";

const Contacts: React.FC = () => {
  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    connectionId: "",
  });
  const { contacts, addContact, removeContact } = useContacts();
  const { connections } = useConnections();

  const handleAdd = async () => {
    if (
      newContact.name.trim() &&
      newContact.phone.trim() &&
      newContact.connectionId
    ) {
      await addContact(newContact);
      setNewContact({ name: "", phone: "", connectionId: "" });
    }
  };

  return (
    <>
      <Navbar />
      <Box sx={{ padding: 3 }}>
        <Box sx={{ padding: 3 }}>
          <Typography variant="h4" gutterBottom>
            Gerenciar Contatos
          </Typography>

          <Grid
            container
            spacing={2}
            alignItems="center"
            sx={{ marginBottom: 3 }}
          >
            <Grid size={4}>
              <TextField
                fullWidth
                variant="outlined"
                label="Nome"
                value={newContact.name}
                onChange={(e) =>
                  setNewContact({ ...newContact, name: e.target.value })
                }
              />
            </Grid>

            <Grid size={4}>
              <TextField
                fullWidth
                variant="outlined"
                label="Telefone"
                value={newContact.phone}
                onChange={(e) =>
                  setNewContact({ ...newContact, phone: e.target.value })
                }
              />
            </Grid>

            <Grid size={3}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Conexão</InputLabel>
                <Select
                  value={newContact.connectionId}
                  onChange={(e) =>
                    setNewContact({
                      ...newContact,
                      connectionId: e.target.value as string,
                    })
                  }
                  label="Conexão"
                >
                  <MenuItem value="">Selecione uma conexão</MenuItem>
                  {connections.map((conn) => (
                    <MenuItem key={conn.id} value={conn.id}>
                      {conn.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={1}>
              <Button
                variant="contained"
                fullWidth
                sx={{ height: "100%" }}
                onClick={handleAdd}
              >
                Adicionar
              </Button>
            </Grid>
          </Grid>
        </Box>

        <List>
          {contacts.map((contact) => {
            const connection = connections.find(
              (conn) => conn.id === contact.connectionId
            );
            return (
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
                  secondary={`Telefone: ${contact.phone} | Conexão: ${
                    connection?.name || "N/A"
                  }`}
                />
              </ListItem>
            );
          })}
        </List>
      </Box>
    </>
  );
};

export default Contacts;
