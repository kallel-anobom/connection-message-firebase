import { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Box,
  Typography,
  Tabs,
  Tab,
  Button,
} from "@mui/material";
import useMessages from "../hooks/useMessages";
import Navbar from "../components/Navbar";

const MessageManagement: React.FC = () => {
  const { messages, updateMessageStatus } = useMessages();
  const [filter, setFilter] = useState<"agendada" | "enviada" | "todos">(
    "todos"
  );

  const filteredMessages = messages.filter((msg) =>
    filter === "todos" ? true : msg.status === filter
  );

  return (
    <>
      <Navbar />
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Gerenciamento de Mensagens
        </Typography>

        <Tabs value={filter} onChange={(e, newValue) => setFilter(newValue)}>
          <Tab label="Todas" value="todos" />
          <Tab label="Agendadas" value="agendada" />
          <Tab label="Enviadas" value="enviada" />
        </Tabs>

        <List>
          {filteredMessages.map((msg) => (
            <ListItem key={msg.id}>
              <ListItemText
                primary={msg.text}
                secondary={`Status: ${
                  msg.status
                } | Agendada para: ${msg.scheduledAt.toLocaleString()}`}
              />
              {msg.status === "agendada" && (
                <Button
                  variant="contained"
                  onClick={() => updateMessageStatus(msg.id, "enviada")}
                >
                  Marcar como Enviada
                </Button>
              )}
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
};

export default MessageManagement;
