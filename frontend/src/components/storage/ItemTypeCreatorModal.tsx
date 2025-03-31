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
          bgcolor: "#f3faf5",
          p: 4,
          borderRadius: 2,
          boxShadow: 24,
          textAlign: "center",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, color: "#3a5a40" }}>Create Item Type</Typography>
        <TextField
          fullWidth
          label="Item Type Name"
          value={newItemTypeName}
          onChange={(e) => setNewItemTypeName(e.target.value)}
        />
        <Box sx={{ display: "flex", justifyContent: "space-evenly", mt: 3 }}>
          <Button
            onClick={handleCreateItemType}
            variant="contained"
            sx={{
              backgroundColor: "#3a5a40",
              color: "#fff",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#2d4739",
              },
            }}
          >
            Create
            <AddIcon sx={{ ml: 1 }} />
          </Button>

          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{
              borderColor: "#3a5a40",
              color: "#3a5a40",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#e6f2ea",
                borderColor: "#2d4739",
              },
            }}
          >
            Close
            <CloseIcon sx={{ ml: 1 }} />
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ItemTypeCreatorModal;
