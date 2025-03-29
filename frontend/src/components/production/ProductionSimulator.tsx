import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Typography, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { ErrorScreen, LoadingScreen } from "../../utils/LoadingAndError";
import { getUserData } from "../../utils/getUserData";
import { fetchProducts } from "../../utils/fetches/ProductService";
import { simulateProduction } from "../../utils/fetches/ProductionService";

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

    const userData = getUserData();
    const userId = userData?.id;
    const jwtToken = userData?.jwt;


    useEffect(() => {
        if (!jwtToken || !userId) {
            setError("User is not authenticated.");
            setLoading(false);
            return;
        }

        const loadProducts = async () => {
            try {
                const data = await fetchProducts(userId, jwtToken);
                setProducts(data);
            } catch (err) {
                console.error("❌ Error fetching products:", err);
                setError("Error fetching products. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, [userId, jwtToken]);

    const handleSimulateProduction = async () => {
        if (!selectedProduct || quantity < 1 || !jwtToken) return;

        setResultMessage(null);

        try {
            const result = await simulateProduction(selectedProduct, quantity, jwtToken);
            if (result.error) {
                setResultMessage(`Error: ${result.error}`);
            } else {
                setResultMessage(result.message || "Simulation complete.");
            }
        } catch (error) {
            setResultMessage("Error simulating production.");
            console.error("Error:", error);
        }
    };


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