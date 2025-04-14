import React, { useState } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import { useThemeMode } from "../../context/ThemeContext";
import { light, dark } from "./theme";

interface RefillItemModalProps {
  open: boolean;
  handleClose: () => void;
  handleRefill: (quantity: number) => void;
}

const RefillItemModal: React.FC<RefillItemModalProps> = ({
  open,
  handleClose,
  handleRefill,
}) => {
  const [quantity, setQuantity] = useState<number>(0);
  const { isDark } = useThemeMode();
  const theme = isDark ? dark : light;

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          color: theme.cardText,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          maxWidth: 400,
          bgcolor: theme.modalBackground,
          p: 4,
          borderRadius: 2,
          boxShadow: 24,
          textAlign: "center",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Refill Item
        </Typography>
        <TextField
          fullWidth
          type="number"
          label="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          InputLabelProps={{ style: { color: theme.cardText } }}
          InputProps={{ style: { color: theme.cardText } }}
        />
        <Box sx={{ display: "flex", justifyContent: "space-evenly", mt: 3 }}>
          <Button
            variant="outlined"
            sx={{
              width: "fit-content",
              borderColor: theme.buttonBackground,
              color: theme.buttonBackground,
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: theme.buttonBackground,
                color: theme.buttonText,
              },
            }}
            onClick={() => handleRefill(quantity)}
          >
            Confirm
          </Button>
          <Button
            variant="outlined"
            sx={{
              width: "fit-content",
              borderColor: theme.drawerBorder,
              color: theme.cardText,
              "&:hover": {
                backgroundColor: isDark ? "#3a3a3a" : "#e0e0e0",
              },
            }}
            onClick={handleClose}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default RefillItemModal;
