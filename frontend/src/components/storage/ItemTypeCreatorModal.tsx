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
import { useThemeMode } from "../../context/ThemeContext";
import { light, dark } from "./theme";

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
  const { isDark } = useThemeMode();
  const theme = isDark ? dark : light;

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
          bgcolor: theme.modalBackground,
          p: 4,
          borderRadius: 2,
          boxShadow: 24,
          textAlign: "center",
          color: theme.cardText,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Create Item Type
        </Typography>
        <TextField
          fullWidth
          label="Item Type Name"
          value={newItemTypeName}
          onChange={(e) => setNewItemTypeName(e.target.value)}
          InputLabelProps={{ style: { color: theme.cardText } }}
          InputProps={{ style: { color: theme.cardText } }}
        />
        <Box sx={{ display: "flex", justifyContent: "space-evenly", mt: 3 }}>
          <Button
            onClick={handleCreateItemType}
            variant="contained"
            sx={{
              backgroundColor: theme.buttonBackground,
              color: theme.buttonText,
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: theme.buttonHoverBackground,
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
              borderColor: theme.buttonBackground,
              color: theme.buttonBackground,
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: theme.buttonHoverBackground || "#eaeaea",
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
