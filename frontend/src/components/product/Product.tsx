import { useEffect, useState } from "react";
import { Box, AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ProductCard from "./ProductCard";
import CreateProductModal from "./CreateProductModal";
import { ErrorScreen, LoadingScreen } from "../../utils/LoadingAndError";
import { getUserData } from "../../utils/getUserData";
import { deleteProduct, fetchProducts as fetchProductsAPI } from "../../utils/fetches/ProductService";
import DeleteProductModal from "./DeleteProductModal";
import { useThemeMode } from "../../context/ThemeContext";
import { light, dark } from "./theme";

interface Product {
  id: number;
  name: string;
  items: ProductItem[];
  userId: number;
}

interface ProductItem {
  itemId: number;
  itemName: string;
  quantity: number;
  quantityType: string;
}

const Product = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [openCreateProduct, setOpenCreateProduct] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [productToDelete, setProductToDelete] = useState<{ id: number; name: string } | null>(null);

  const { isDark } = useThemeMode();
  const theme = isDark ? dark : light;


  const userData = getUserData();
  const userId = userData?.id;
  const jwtToken = userData?.jwt;

  const fetchProducts = async () => {
    if (!userId || !jwtToken) {
      setError("User ID or token not found");
      setLoading(false);
      return;
    }

    try {
      const data = await fetchProductsAPI(userId, jwtToken);
      setProducts(data);
    } catch (error) {
      console.error(error);
      setError("Error fetching products.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    if (!jwtToken) return;
    try {
      await deleteProduct(productId, jwtToken);
      setProductToDelete(null);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      setError("Failed to delete product.");
    }
  };


  useEffect(() => {
    fetchProducts();
    for (let i = 0; i < products.length; i++) {
      console.log("Product ID: " + products[i].id);
    }
  }, [userId, jwtToken]);

  if (loading) {
    return (
      <LoadingScreen />
    );
  }

  if (error) {
    return (
      <ErrorScreen error={error} />
    );
  }

  return (
    <Box sx={{
      margin: "0 auto",
      border: "1px solid #ccc",
      borderRadius: "8px",
      background: theme.pageBackground,
      width: "99.8%",
      height: "calc(100vh - 4rem)",
      overflowY: "scroll",
      position: "relative",
      "&::-webkit-scrollbar": { display: "none" },
      mt: "4rem"
    }}>
      <AppBar position="sticky" sx={{ width: "100%", backgroundColor: theme.appBarBackground, borderRadius: "5px" }}>
        <Toolbar>
          <IconButton sx={{ color: theme.optionButtonText, fontWeight: "medium" }} onClick={() => setDrawerOpen(true)}>
            Options <ArrowRightIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: "60vh",
            borderTop: `5px solid ${theme.drawerBorder}`,
            backgroundColor: theme.drawerBackground,
          },

        }}>
        <List>
          <ListItem>
            <ListItemButton onClick={() => { setOpenCreateProduct(true); setDrawerOpen(false); }}>
              <ListItemText primary="Create Product" sx={{ fontWeight: "bold" }} />
              <AddIcon />
            </ListItemButton>
          </ListItem>
          <Divider variant="middle" sx={{ borderBottomWidth: 2 }} />
        </List>
      </Drawer>

      <CreateProductModal open={openCreateProduct} handleClose={() => setOpenCreateProduct(false)} fetchProducts={fetchProducts} />

      <Box sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        },
        gap: "2rem",
        padding: "2rem",
        justifyItems: "center",
        justifyContent: "center",
        backgroundColor: "inherit",
        overflowX: "hidden",
      }}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onRequestDelete={(id, name) => setProductToDelete({ id, name })}
          />
        ))}
      </Box>
      <DeleteProductModal
        isOpen={!!productToDelete}
        productName={productToDelete?.name || ""}
        onClose={() => setProductToDelete(null)}
        onConfirm={() => {
          if (productToDelete) handleDeleteProduct(productToDelete.id);
        }}
      />
    </Box>
  );
};

export default Product;
