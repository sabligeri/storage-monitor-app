import React from "react";
import { Card, CardHeader, CardContent, Typography, Box, IconButton, Menu } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface Product {
    id: number;
    name: string;
    items: { itemName: string; quantity: number; quantityType: string }[];
    userId: number;
}

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const [menuAnchor, setMenuAnchor] = React.useState<null | HTMLElement>(null
    );
    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setMenuAnchor(event.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuAnchor(null);
    };
    return (
        <>
            <Card sx={{ maxWidth: 300, backgroundColor: "#decf83", p: 1, minWidth: 300, m: 1, border: 3, borderStyle: "solid", borderColor: "black" }}>
                <CardHeader
                    sx={{
                        minHeight: 60,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                    title={
                        <Box sx={{ fontWeight: "bold", textAlign: "left", overflow: "auto", whiteSpace: "break-word", flexGrow: 1, maxWidth: "80%", maxHeight: 40, "&::-webkit-scrollbar": { display: "none" }, }}>
                            <Typography variant="h6">{product.name}</Typography>
                        </Box>
                    }
                    action={
                        <IconButton onClick={handleMenuOpen} aria-label="settings" >
                            <MoreVertIcon />
                        </IconButton>
                    }
                />
                <CardContent sx={{ minHeight: 60, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>Items:</Typography>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 1 }}>
                        {product.items.length > 0 ? (
                            product.items.map((item, index) => (
                                <Typography key={index} variant="body2">
                                    {item.itemName}: {item.quantity} {item.quantityType}
                                </Typography>
                            ))
                        ) : (
                            <Typography variant="body2" color="text.secondary">No items</Typography>
                        )}
                    </Box>
                </CardContent>


                <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}>

                </Menu>
            </Card>


        </>
    );
};

export default ProductCard;
