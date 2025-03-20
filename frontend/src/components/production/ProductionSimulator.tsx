import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Typography, MenuItem, Select, FormControl, InputLabel } from "@mui/material";

interface Product {
    id: number;
    name: string;
}

const ProductionSimulator: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [resultMessage, setResultMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const savedData = localStorage.getItem("jwt-response");
    const parsedData = savedData ? JSON.parse(savedData) : null;
    const jwtToken = parsedData?.jwt;
    const userId = parsedData?.id;
    

    useEffect(() => {
        console.log("🔹 JWT Token:", jwtToken);
        console.log("🔹 User ID:", userId);

        if (!jwtToken || !userId) {
            setError("User is not authenticated.");
            setLoading(false);
            return;
        }

        const fetchProducts = async () => {
            try {
                const response = await fetch(`/api/product/user/${userId}`, {
                    headers: { Authorization: `Bearer ${jwtToken}` },
                });

                console.log("🔹 Fetch Products Response Status:", response.status);

                if (!response.ok) throw new Error("Failed to fetch products");

                const data = await response.json();
                console.log("✅ Fetched products:", data);
                setProducts(data);
            } catch (error) {
                console.error("❌ Error fetching products:", error);
                setError("Error fetching products. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [jwtToken, userId]);

    


    const handleSimulateProduction = async () => {
        console.log("🔹 Selected Product ID:", selectedProduct); 
        if (!selectedProduct || quantity < 1) return;

        setResultMessage(null);

        try {
            const response = await fetch("/api/production/simulate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwtToken}`
                },
                body: JSON.stringify({
                    productId: selectedProduct,
                    quantity: quantity
                }),
            });

            console.log("🔹 Simulation Response Status:", response.status);

            const result = await response.json();
            console.log("✅ Simulation Result:", result);

            if (!response.ok) {
                setResultMessage(result.error);
            } else {
                setResultMessage(result.message);
            }
        } catch (error) {
            setResultMessage("Error simulating production.");
            console.error("Error:", error);
        }
    };


    if (loading) {
        return (
            <div id="loading-screen-container">
                <div className="loader"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div id="storage-error-container">
                <i className="bi bi-cone-striped" style={{ color: "orange" }}></i>
                {error}
                <i className="bi bi-cone-striped" style={{ color: "orange" }}></i>
            </div>
        );
    }

    return (
        <Box sx={{
            maxWidth: 500,
            margin: "0 auto",
            p: 3,
            border: "1px solid #ccc",
            borderRadius: 2,
            backgroundColor: "#f5f5dc",
            color: "black"
        }}>
            <Typography
                variant="h6"
                sx={{ mb: 2, fontWeight: "bold" }}
            >
                Simulate Production
            </Typography>

            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Select Product</InputLabel>
                <Select
                    value={selectedProduct || ""}
                    onChange={(e) => {
                        console.log("🔹 Product selected:", e.target.value, typeof e.target.value);
                        setSelectedProduct(Number(e.target.value));
                    }}
                
                >
                    {products.map((product) => (
                        <MenuItem key={product.id} value={product.id}>
                            {product.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TextField
                fullWidth
                label="Quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                sx={{ mb: 2 }}
            />

            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSimulateProduction}
            >
                Simulate Production
            </Button>

            {resultMessage && (
                <Typography
                    variant="body1"
                    sx={{
                        mt: 2,
                        fontWeight: "bold",
                        color: resultMessage.includes("Error") ? "red" : "green"
                    }}
                >
                    {resultMessage}
                </Typography>
            )}
        </Box>
    );
};

export default ProductionSimulator;