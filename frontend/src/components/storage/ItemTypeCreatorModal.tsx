import React from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

interface ItemTypeCreatorProps {
  open: boolean;
  handleClose: () => void;
  newItemTypeName: string;
  setNewItemTypeName: (name: string) => void;
  handleCreateItemType: () => void;
}

const ItemTypeCreatorModal: React.FC<ItemTypeCreatorProps> = ({
  open,
  handleClose,
  newItemTypeName,
  setNewItemTypeName,
  handleCreateItemType,
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          maxWidth: 400,
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 2,
          boxShadow: 24,
          textAlign: "center",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, color: "black" }}>Create Item Type</Typography>
        <TextField
          fullWidth
          label="Item Type Name"
          value={newItemTypeName}
          onChange={(e) => setNewItemTypeName(e.target.value)}
        />
        <Box sx={{ display: "flex", justifyContent: "space-evenly", mt: 3 }}>
          <Button variant="contained" color="primary" onClick={handleCreateItemType} sx={{ width: "fit-content" }}>
            Create
            <AddIcon />
          </Button>
          <Button variant="contained" color="primary" onClick={handleClose} sx={{ width: "fit-content" }}>
            Close
            <CloseIcon />
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ItemTypeCreatorModal;
