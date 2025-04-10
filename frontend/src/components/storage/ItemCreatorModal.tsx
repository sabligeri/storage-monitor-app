import React from "react";
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
import AddIcon from '@mui/icons-material/Add';

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
          bgcolor: "#F0EFEB",
          p: 4,
          borderRadius: 2,
          boxShadow: 24,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, color: "#3a5a40" }}>Create Item</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Item Name"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Quantity Type</InputLabel>
              <Select
                value={newItemQuantityType}
                onChange={(e) => setNewItemQuantityType(e.target.value)}
              >
                {quantityTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="number"
              label="Quantity"
              value={newItemQuantity}
              onChange={(e) => setNewItemQuantity(Number(e.target.value))}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Item Type</InputLabel>
              <Select
                value={newItemTypeId}
                onChange={(e) => setNewItemTypeId(Number(e.target.value))}
              >
                {itemTypes.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "space-evenly", mt: 3 }}>
          <Button
            variant="contained"
            onClick={handleCreateItem}
            sx={{
              backgroundColor: "#283618",
              color: "#fff",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#1e2914",
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
              borderColor: "#283618",
              color: "#283618",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#D4D4D4",
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
