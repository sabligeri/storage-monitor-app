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

interface Item {
    id: number;
    name: string;
    itemType: { id: number; name: string };
    quantityType: string;
    quantity: number;
}

interface ItemCardProps {
    item: Item;
    onRefill: (item: Item) => void;
    onDelete: (item: Item) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onRefill, onDelete }) => {
    const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setMenuAnchor(event.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuAnchor(null);
    };

    return (
        <Card sx={{ maxWidth: 300, backgroundColor: "#f5f5f5", p: 1, minWidth: 300, m: 1 }}>
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
                        }}
                    >
                        <Typography variant="h6">{item.name}</Typography>
                    </Box>
                }
                action={
                    <IconButton onClick={handleMenuOpen} aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
            />
            <CardContent sx={{ minHeight: 60, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>Type:</Typography>
                    <Typography variant="body2">{item.itemType.name}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>{item.quantityType}:</Typography>
                    <Typography variant="body2">{item.quantity}</Typography>
                </Box>
            </CardContent>

            {/* Three-dot menu for actions */}
            <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
                <MenuItem onClick={() => { handleMenuClose(); onRefill(item); }}>Refill</MenuItem>
                <MenuItem onClick={() => { handleMenuClose(); onDelete(item); }}>Delete</MenuItem>
            </Menu>
        </Card>
    );
};

export default ItemCard;
