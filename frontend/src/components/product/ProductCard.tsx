import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import { useThemeMode } from "../../context/ThemeContext";
import { light, dark } from "./theme";

interface Product {
  id: number;
  name: string;
  items: { itemName: string; quantity: number; quantityType: string }[];
  userId: number;
}

interface ProductCardProps {
  product: Product;
  onRequestDelete: (productId: number, productName: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onRequestDelete }) => {
  const [menuAnchor, setMenuAnchor] = React.useState<null | HTMLElement>(null);
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
          minWidth: 300,
          m: 1,
          p: 2,
          border: 2,
          borderColor: theme.drawerBorder,
          borderStyle: "solid",
          backgroundColor: theme.drawerBackground,
          color: theme.cardText,
          boxShadow: 3,
          transition: "transform 0.2s ease",
          "&:hover": {
            transform: "scale(1.015)",
            boxShadow: 6,
          },
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
              <Typography variant="h6" color={theme.cardText}>
                {product.name}
              </Typography>
            </Box>
          }
          action={
            <IconButton onClick={handleMenuOpen} aria-label="settings" sx={{ color: theme.cardText }}>
              <MoreVertIcon />
            </IconButton>
          }
        />
        <CardContent
          sx={{
            minHeight: 60,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: "bold", color: theme.cardText }}>
            Items:
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 1 }}>
            {product.items.length > 0 ? (
              product.items.map((item, index) => (
                <Typography key={index} variant="body2" color={theme.cardText}>
                  {item.itemName}: {item.quantity} {item.quantityType}
                </Typography>
              ))
            ) : (
              <Typography variant="body2" sx={{ color: theme.cardText }}>
                No items
              </Typography>
            )}
          </Box>
        </CardContent>

        <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
          <MenuItem
            onClick={() => {
              handleMenuClose();
              onRequestDelete(product.id, product.name);
            }}
          >
            <DeleteIcon sx={{ mr: 1 }} />
            Delete
          </MenuItem>
        </Menu>
      </Card>
    </>
  );
};

export default ProductCard;
