import React from "react";
import { Modal, Box, Button, Typography } from "@mui/material";

interface DeleteProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productName: string
}

const DeleteProductModal: React.FC<DeleteProductModalProps> = ({ isOpen, onClose, onConfirm, productName }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          p: 4,
          bgcolor: "#FBEEDB", // champagne
          borderRadius: 2,
          width: "90%",
          maxWidth: 400,
          mx: "auto",
          mt: "25vh",
          textAlign: "center",
          border: "2px solid #B69E88",
          color: "#1B1B1B"
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Are you sure you want to delete {productName}?
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-around", mt: 2 }}>
          <Button variant="outlined" color="inherit" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={onConfirm}>
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteProductModal;
