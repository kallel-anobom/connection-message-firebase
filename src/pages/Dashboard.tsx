import { Box, Container, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

import Navbar from "../components/Navbar";

const Dashboard: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Navbar />
      <Container sx={{ mt: 3 }}>
        <Typography variant="h4" gutterBottom>
          Painel de Controle
        </Typography>
        <Grid container spacing={3}>
          <Grid size={4}>
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h6">Usuários</Typography>
              <Typography variant="h4">1500</Typography>
            </Paper>
          </Grid>

          <Grid size={4}>
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h6">Vendas</Typography>
              <Typography variant="h4">R$ 45.000</Typography>
            </Paper>
          </Grid>

          <Grid size={4}>
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h6">Pedidos</Typography>
              <Typography variant="h4">320</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
