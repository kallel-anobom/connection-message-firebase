import { useState } from "react";
import {
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import useConnections from "../hooks/useConnections";
import Navbar from "../components/Navbar";

const Connections: React.FC = () => {
  const [newConnection, setNewConnection] = useState("");
  const { connections, addConnection, removeConnection } = useConnections();

  const handleAdd = () => {
    if (newConnection.trim()) {
      addConnection(newConnection);
      setNewConnection("");
    }
  };

  return (
    <>
      <Navbar />
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Gerenciar Conexões
        </Typography>

        <Box sx={{ display: "flex", gap: 2, marginBottom: 3 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Nome da Conexão"
            value={newConnection}
            onChange={(e) => setNewConnection(e.target.value)}
          />
          <Button variant="contained" onClick={handleAdd}>
            Adicionar
          </Button>
        </Box>

        <List>
          {connections.map((conn) => (
            <ListItem
              key={conn.id}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => removeConnection(conn.id)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText primary={conn.name} />
              <Button
                component={Link}
                to={`/contacts/${conn.id}`}
                variant="outlined"
              >
                Ver Contatos
              </Button>
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
};

export default Connections;
