import React, { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Grid,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { useThemeMode } from "../../context/ThemeContext";
import { light, dark } from "./theme";

interface ItemType {
  id: number;
  name: string;
}

interface ItemCreatorProps {
  open: boolean;
  handleClose: () => void;
  newItemName: string;
  setNewItemName: (name: string) => void;
  newItemTypeId: number;
  setNewItemTypeId: (id: number) => void;
  newItemQuantityType: string;
  setNewItemQuantityType: (type: string) => void;
  newItemQuantity: number;
  setNewItemQuantity: (quantity: number) => void;
  itemTypes: ItemType[];
  quantityTypes: string[];
  handleCreateItem: () => void;
}

const ItemCreatorModal: React.FC<ItemCreatorProps> = ({
  open,
  handleClose,
  newItemName,
  setNewItemName,
  newItemTypeId,
  setNewItemTypeId,
  newItemQuantityType,
  setNewItemQuantityType,
  newItemQuantity,
  setNewItemQuantity,
  itemTypes,
  quantityTypes,
  handleCreateItem,
}) => {
  const { isDark } = useThemeMode();
  const theme = isDark ? dark : light;

  const [formErrors, setFormErrors] = useState({
    itemName: '',
    quantityType: '',
    quantity: '',
    itemType: '',
  });

  const validateAndSubmit = () => {
    const errors = {
      itemName: newItemName.trim() ? '' : 'Item name is required.',
      quantityType: newItemQuantityType.trim() ? '' : 'Quantity type is required.',
      quantity: newItemQuantity >= 0 ? '' : 'Quantity must be 0 or greater.',
      itemType: newItemTypeId > 0 ? '' : 'Item type is required. If none exist, please create one.',
    };

    setFormErrors(errors);

    const hasErrors = Object.values(errors).some((msg) => msg);
    if (!hasErrors) {
      handleCreateItem();
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          maxWidth: 500,
          bgcolor: theme.modalBackground,
          color: theme.cardText,
          p: 4,
          borderRadius: 2,
          boxShadow: 24,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, color: theme.cardText }}>
          Create Item
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Item Name"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              error={!!formErrors.itemName}
              helperText={formErrors.itemName}
              InputLabelProps={{ style: { color: theme.cardText } }}
              InputProps={{ style: { color: theme.cardText } }}
            />
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth error={!!formErrors.quantityType}>
              <InputLabel sx={{ color: theme.cardText }}>Quantity Type</InputLabel>
              <Select
                value={newItemQuantityType}
                onChange={(e) => setNewItemQuantityType(e.target.value)}
                sx={{ color: theme.cardText }}
              >
                {quantityTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
              {formErrors.quantityType && (
                <Typography variant="caption" color="error" sx={{ ml: 2 }}>
                  {formErrors.quantityType}
                </Typography>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              type="number"
              label="Quantity"
              value={newItemQuantity}
              onChange={(e) => setNewItemQuantity(Number(e.target.value))}
              error={!!formErrors.quantity}
              helperText={formErrors.quantity}
              InputLabelProps={{ style: { color: theme.cardText } }}
              InputProps={{ style: { color: theme.cardText } }}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth error={!!formErrors.itemType}>
              <InputLabel sx={{ color: theme.cardText }}>Item Type</InputLabel>
              <Select
                value={newItemTypeId}
                onChange={(e) => setNewItemTypeId(Number(e.target.value))}
                sx={{ color: theme.cardText }}
              >
                {itemTypes.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
              {formErrors.itemType && (
                <Typography variant="caption" color="error" sx={{ ml: 2 }}>
                  {formErrors.itemType}
                </Typography>
              )}
            </FormControl>
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "space-evenly", mt: 3 }}>
          <Button
            variant="contained"
            onClick={validateAndSubmit}
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
            variant="outlined"
            onClick={handleClose}
            sx={{
              borderColor: theme.buttonBackground,
              color: theme.buttonBackground,
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: theme.drawerBackground,
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

export default ItemCreatorModal;
