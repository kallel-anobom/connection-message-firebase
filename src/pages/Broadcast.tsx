import { useState } from "react";
import {
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Box,
  Typography,
} from "@mui/material";
import useContacts from "../hooks/useContacts";
import useMessages from "../hooks/useMessages";
import Navbar from "../components/Navbar";

const Broadcast: React.FC = () => {
  const { contacts } = useContacts();
  const { addMessage } = useMessages();

  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [messageText, setMessageText] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");

  const handleAdd = async () => {
    if (messageText.trim() && selectedContacts.length > 0 && scheduledAt) {
      const selectedContactsData = contacts.filter((c) =>
        selectedContacts.includes(c.id)
      );
      const newMessage = {
        text: messageText,
        status: "agendada" as "agendada",
        scheduledAt: new Date(scheduledAt),
        contacts: selectedContactsData,
      };
      await addMessage(newMessage);
      setMessageText("");
      setScheduledAt("");
      setSelectedContacts([]);
    }
  };

  return (
    <>
      <Navbar />
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Envio de Mensagens
        </Typography>

        <TextField
          fullWidth
          variant="outlined"
          placeholder="Digite a mensagem"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Typography variant="h6" gutterBottom>
          Selecionar Contatos
        </Typography>
        <List>
          {contacts.map((contact) => (
            <ListItem key={contact.id}>
              <Checkbox
                checked={selectedContacts.includes(contact.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedContacts((prev) => [...prev, contact.id]);
                  } else {
                    setSelectedContacts((prev) =>
                      prev.filter((id) => id !== contact.id)
                    );
                  }
                }}
              />
              <ListItemText primary={contact.name} secondary={contact.phone} />
            </ListItem>
          ))}
        </List>

        <Typography variant="h6" gutterBottom>
          Agendar Envio
        </Typography>
        <TextField
          fullWidth
          type="datetime-local"
          value={scheduledAt}
          onChange={(e) => setScheduledAt(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Button variant="contained" onClick={handleAdd}>
          Agendar Mensagem
        </Button>
      </Box>
    </>
  );
};

export default Broadcast;
