import { useState } from "react";
import { AlertTitle, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

interface AlertProps {
  type: "success" | "error";
  message: string;
  onClose?: () => void;
}

const CustomAlert: React.FC<AlertProps> = ({ message, type, onClose }) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    if (onClose) onClose();
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <MuiAlert
        onClose={handleClose}
        variant="filled"
        severity={type}
        sx={{ width: "100%" }}
      >
        <AlertTitle>{message}</AlertTitle>
      </MuiAlert>
    </Snackbar>
  );
};

export default CustomAlert;
