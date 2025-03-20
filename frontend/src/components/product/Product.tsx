import { useEffect, useState } from "react";
import { Box, AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ProductCard from "./ProductCard";
import CreateProductModal from "./CreateProductModal";

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

  const savedData = localStorage.getItem("jwt-response");
  const parsedData = savedData ? JSON.parse(savedData) : null;
  const userId = parsedData?.id;
  const jwtToken = parsedData?.jwt;

  const fetchProducts = async () => {
    if (!userId || !jwtToken) {
      setError("User ID or token not found");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/product/user/${userId}`, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });

      if (!response.ok) throw new Error("Failed to fetch products");

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setError("Error fetching products: " + error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    for(let i = 0; i < products.length; i++) {
      console.log("Product ID: " + products[i].id);
    }
  }, [userId, jwtToken]);

  if (loading) {
    return (
      <div id="loading-screen-container">
        <div className="loader"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div id="storage-error-container">
        <i className="bi bi-cone-striped" style={{ "color": "orange" }}></i> {error} <i className="bi bi-cone-striped" style={{ "color": "orange" }}></i>
      </div>
    )
  }

  return (
    <Box sx={{
      margin: "0 auto",
      border: "1px solid #ccc",
      borderRadius: "8px",
      background: `radial-gradient(circle at top, rgba(255, 236, 139, 0.8) 20%, rgba(219, 182, 61, 0.9) 40%),
       linear-gradient(to bottom, rgba(219, 182, 61, 1) 30%, rgba(135, 206, 235, 1) 100%)`,
      width: "95%",
      height: "calc(89vh)",
      overflowY: "scroll",
      position: "relative",
      "&::-webkit-scrollbar": { display: "none" },
    }}>
      <AppBar position="sticky" sx={{ width: "100%", backgroundColor: "rgba(255, 236, 139)", borderRadius: "5px" }}>
        <Toolbar>
          <IconButton sx={{ color: "black", fontWeight: "medium" }} onClick={() => setDrawerOpen(true)}>
            Options <ArrowRightIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)} sx={{ "& .MuiDrawer-paper": { width: "60vh", borderTop: "5px solid black" } }}>
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
          <ProductCard key={product.id} product={product} />
        ))}
      </Box>
    </Box>
  );
};

export default Product;
