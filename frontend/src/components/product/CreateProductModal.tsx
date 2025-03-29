import React, { useEffect, useRef, useState } from "react";
import { Modal, Box, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem, Autocomplete } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { getUserData } from "../../utils/getUserData";

import { fetchStorages } from "../../utils/fetches/StorageService";
import { createProduct } from "../../utils/fetches/ProductService";

interface Storage {
  id: number;
  name: string;
  items?: { id: number; name: string, quantityType: string }[];
}

interface SelectedItem {
  id: number;
  name: string;
  quantity: number;
  quantityType: string;
}

interface CreateProductModalProps {
  open: boolean;
  handleClose: () => void;
  fetchProducts: () => void;
}

const CreateProductModal: React.FC<CreateProductModalProps> = ({ open, handleClose, fetchProducts }) => {
  const [productName, setProductName] = useState("");
  const [selectedStorage, setSelectedStorage] = useState<number | null>(null);
  const [storageList, setStorageList] = useState<Storage[]>([]);
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);

    const userData = getUserData();
    const userId = userData?.id;
    const jwtToken = userData?.jwt;

    const hasFetchedRef = useRef(false);

    useEffect(() => {
      const fetchData = async () => {
        if (!userId || !jwtToken || hasFetchedRef.current) return;
  
        try {
          const data = await fetchStorages(userId, jwtToken);
          setStorageList(data);
          hasFetchedRef.current = true;
        } catch (error) {
          console.error("Error fetching storages:", error);
        }
      };
  
      if (open) fetchData();
    }, [open, userId, jwtToken]);
  
    const handleCreateProduct = async () => {
      if (!productName || !selectedStorage || selectedItems.length === 0 || !userId || !jwtToken) return;
  
      try {
        await createProduct(
          productName,
          selectedItems.map(item => ({ itemId: item.id, quantity: item.quantity })),
          userId,
          jwtToken
        );
  
        setProductName("");
        setSelectedStorage(null);
        setSelectedItems([]);
        fetchProducts();
        handleClose();
      } catch (error) {
        console.error("Error creating product:", error);
      }
    };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "80%", maxWidth: 500, bgcolor: "background.paper", p: 4, borderRadius: 2, boxShadow: 24 }}>
        <Typography variant="h6" sx={{ mb: 2, color: "black" }}>Create Product</Typography>
        <TextField fullWidth label="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} sx={{ mb: 2 }} />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Select Storage</InputLabel>
          <Select
            value={selectedStorage || ""}
            onChange={(e) => setSelectedStorage(Number(e.target.value))}
          >
            {storageList.map((storage) => (
              <MenuItem key={storage.id} value={storage.id}>{storage.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {selectedStorage && (
          <Autocomplete
            multiple
            options={storageList.find((s) => s.id === selectedStorage)?.items || []}
            getOptionLabel={(option) => option.name}
            value={selectedItems}
            onChange={(_, newValue) => {
              setSelectedItems(newValue.map(item => ({
                ...item,
                quantity: selectedItems.find(i => i.id === item.id)?.quantity || 1,
              })));
            }}
            renderInput={(params) => <TextField {...params} label="Select Items" />}
          />
        )}

        {selectedItems.length > 0 && (
          <Box sx={{ mt: 2, color: "black" }}>
            <Typography variant="body1" sx={{ mb: 1 }}>Set Quantities:</Typography>
            {selectedItems.map((item) => (
              <Box key={item.id} sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                <Typography sx={{ minWidth: 100 }}>{item.name}:</Typography>
                <TextField
                  type="number"
                  size="small"
                  value={item.quantity}
                  onChange={(e) => {
                    const newQuantity = Math.max(1, Number(e.target.value));
                    setSelectedItems(prev =>
                      prev.map(i => (i.id === item.id ? { ...i, quantity: newQuantity } : i))
                    );
                  }}
                  sx={{ width: 80 }}
                />
                <Typography variant="body2" sx={{ fontStyle: "italic", color: "gray" }}>
                  {item.quantityType}
                </Typography>
              </Box>
            ))}
          </Box>
        )}

        <Box sx={{ display: "flex", justifyContent: "space-evenly", mt: 3 }}>
          <Button variant="contained" color="primary" onClick={handleCreateProduct}><AddIcon /> Create</Button>
          <Button variant="contained" color="primary" onClick={handleClose}><CloseIcon /> Close</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateProductModal;
