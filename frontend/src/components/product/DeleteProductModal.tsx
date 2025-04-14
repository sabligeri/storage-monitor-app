import React from "react";
import { Modal, Box, Button, Typography } from "@mui/material";
import { useThemeMode } from "../../context/ThemeContext";
import { light, dark } from "./theme";

interface DeleteProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productName: string;
}

const DeleteProductModal: React.FC<DeleteProductModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  productName,
}) => {
  const { isDark } = useThemeMode();
  const theme = isDark ? dark : light;

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          p: 4,
          bgcolor: theme.drawerBackground,
          borderRadius: 2,
          width: "90%",
          maxWidth: 400,
          mx: "auto",
          mt: "25vh",
          textAlign: "center",
          border: `2px solid ${theme.drawerBorder}`,
          color: theme.cardText,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Are you sure you want to delete <strong>{productName}</strong>?
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-around", mt: 2 }}>
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              color: theme.drawerBorder,
              borderColor: theme.drawerBorder,
              "&:hover": {
                backgroundColor: isDark ? "#333" : "#f0eae3",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={onConfirm}
            sx={{
              fontWeight: "bold",
            }}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteProductModal;
