import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RefillItemModal from "./RefillItemModal";
import DeleteItemModal from "./DeleteItemModal";
import { useThemeMode } from "../../context/ThemeContext";
import { light, dark } from "./theme";

interface Item {
  id: number;
  name: string;
  itemType: { id: number; name: string };
  quantityType: string;
  quantity: number;
}

interface ItemCardProps {
  item: Item;
  onRefill: (itemId: number, quantity: number) => void;
  onDelete: (itemId: number) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onRefill, onDelete }) => {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [openRefillModal, setOpenRefillModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const { isDark } = useThemeMode();
  const theme = isDark ? dark : light;

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  return (
    <>
      <Card
        sx={{
          maxWidth: 300,
          p: 1,
          minWidth: 300,
          m: 1,
          border: 3,
          borderStyle: "solid",
          backgroundColor: theme.cardBackground,
          borderColor: theme.drawerBorder,
          color: theme.cardText,
        }}
      >
        <CardHeader
          sx={{
            minHeight: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          title={
            <Box
              sx={{
                fontWeight: "bold",
                textAlign: "left",
                overflow: "auto",
                whiteSpace: "break-word",
                flexGrow: 1,
                maxWidth: "80%",
                maxHeight: 40,
                "&::-webkit-scrollbar": { display: "none" },
              }}
            >
              <Typography variant="h6" sx={{ color: theme.cardText }}>
                {item.name}
              </Typography>
            </Box>
          }
          action={
            <IconButton onClick={handleMenuOpen} aria-label="settings">
              <MoreVertIcon sx={{ color: theme.cardText }} />
            </IconButton>
          }
        />
        <CardContent
          sx={{
            minHeight: 60,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            color: theme.cardText,
          }}
        >
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2" fontWeight="bold">
              Type:
            </Typography>
            <Typography variant="body2">{item.itemType.name}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2" fontWeight="bold">
              {item.quantityType}:
            </Typography>
            <Typography variant="body2">{item.quantity}</Typography>
          </Box>
        </CardContent>

        <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
          <MenuItem
            onClick={() => {
              handleMenuClose();
              setOpenRefillModal(true);
            }}
          >
            Refill
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleMenuClose();
              setOpenDeleteModal(true);
            }}
          >
            Delete
          </MenuItem>
        </Menu>
      </Card>

      <RefillItemModal
        open={openRefillModal}
        handleClose={() => setOpenRefillModal(false)}
        handleRefill={(quantity) => {
          onRefill(item.id, quantity);
          setOpenRefillModal(false);
        }}
      />

      <DeleteItemModal
        open={openDeleteModal}
        handleClose={() => setOpenDeleteModal(false)}
        handleDelete={() => {
          onDelete(item.id);
          setOpenDeleteModal(false);
        }}
      />
    </>
  );
};

export default ItemCard;
