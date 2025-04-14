import React from "react";
import { Modal, Box, Button, Typography } from "@mui/material";
import { useThemeMode } from "../../context/ThemeContext";
import { light, dark } from "./theme";

interface DeleteItemModalProps {
  open: boolean;
  handleClose: () => void;
  handleDelete: () => void;
}

const DeleteItemModal: React.FC<DeleteItemModalProps> = ({
  open,
  handleClose,
  handleDelete,
}) => {
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
          Delete Item
        </Typography>
        <Typography variant="body1">
          Are you sure you want to delete this item?
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-evenly", mt: 3 }}>
          <Button
            variant="outlined"
            sx={{
              borderColor: theme.deleteColor,
              color: theme.deleteColor,
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: theme.deleteColor,
                color: "#fff",
              },
            }}
            onClick={handleDelete}
          >
            Delete
          </Button>
          <Button
            variant="outlined"
            sx={{
              borderColor: theme.cancelColor,
              color: theme.cancelColor,
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: isDark ? "#555" : "#eee",
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

export default DeleteItemModal;
