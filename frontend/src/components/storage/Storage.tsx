import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Divider,
    Box,
} from "@mui/material";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ItemCreatorModal from "./ItemCreatorModal";
import AddIcon from '@mui/icons-material/Add';
import ItemTypeCreatorModal from "./ItemTypeCreatorModal";
import ItemCard from "./ItemCard";
import { LoadingScreen, ErrorScreen } from "../../utils/LoadingAndError";
import { getUserData } from "../../utils/getUserData";


interface Item {
    id: number;
    name: string;
    itemType: ItemType;
    quantityType: string;
    quantity: number;
}

interface ItemType {
    id: number;
    name: string;
}

const Storage = () => {
    const { storageId } = useParams<{ storageId: string }>();
    const [items, setItems] = useState<Item[]>([])
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [itemTypes, setItemTypes] = useState<ItemType[]>([]);
    const [quantityTypes, setQuantityTypes] = useState<string[]>([])
    const [newItemTypeName, setNewItemTypeName] = useState<string>("");

    const [newItemName, setNewItemName] = useState<string>("");
    const [newItemTypeId, setNewItemTypeId] = useState<number>(0);
    const [newItemQuantityType, setNewItemQuantityType] = useState<string>("");
    const [newItemQuantity, setNewItemQuantity] = useState<number>(0);

    const [openCreateItem, setOpenCreateItem] = useState(false);
    const [openCreateItemType, setOpenCreateItemType] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const userData = getUserData();
    const userId = userData?.id;
    const jwtToken = userData?.jwt;

    const fetchItems = async () => {
        if (!userId || !jwtToken) {
            setError("User id or token not found");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`/api/storage/${storageId}/items`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwtToken}`,
                }
            })

            if (response.status === 204) {
                setItems([]);
                return;
            }

            const data = await response.json();
            setItems(data);

        } catch (error) {
            console.error("Error occured while fetching items ", error)
            setError("Error occured while fetching items " + error)
        } finally {
            setLoading(false)
        }
    }

    const fetchItemTypes = async () => {
        if (!userId || !jwtToken) {
            setError("User id or token not found");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`/api/itemType/user/${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwtToken}`,
                }
            })

            if (response.status === 204) {
                setItems([]);
                return;
            }

            const data = await response.json();
            setItemTypes(data);

        } catch (error) {
            console.error("Error occured while fetching item types: ", error)
            setError("Error occured while fetching item types: " + error);
        } finally {
            setLoading(false)
        }
    }

    const fetchQuantiTypes = async () => {
        if (!userId || !jwtToken) {
            setError("User id or token not found");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("/api/quantity-types/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })

            const data = await response.json();
            setQuantityTypes(data);

        } catch (error) {
            console.error("Error occured while fetching quantityTypes: ", error)
            setError("Error occured while fetching quantityTypes: " + error)
        } finally {
            setLoading(false)
        }
    }

    const handleCreateItem = async () => {
        if (!newItemName.trim() || newItemTypeId <= 0 || !newItemQuantityType.trim() || newItemQuantity < 0) {
            return;
        }

        try {
            const response = await fetch(`/api/item/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwtToken}`,
                },
                body: JSON.stringify({
                    name: newItemName,
                    quantity: newItemQuantity,
                    quantityType: newItemQuantityType,
                    storageId: storageId,
                    itemTypeId: newItemTypeId
                }),
            })

            if (!response.ok) {
                setError("Failed to create item");
                throw new Error("Failed to create item");
            }

            setNewItemName("");
            setNewItemTypeId(0);
            setNewItemQuantityType("");
            setNewItemQuantity(0);
            fetchItems();
            setOpenCreateItem(false);
        } catch (error) {
            setError("Error occured while creating Item: \n" + error);
        }
    }

    const handleCreateItemType = async () => {
        if (!newItemTypeName.trim()) {
            return;
        }

        try {
            const response = await fetch(`/api/itemType/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwtToken}`,
                },
                body: JSON.stringify({
                    name: newItemTypeName,
                    userId: userId
                }),
            })

            if (!response.ok) {
                setError("Failed to create item type");
                throw new Error("Failed to create item type");
            }

            setNewItemTypeName("");
            fetchItemTypes();
            setOpenCreateItemType(false);
        } catch (error) {
            setError("Error occured while creating Item Type: \n" + error);
        }
    }

    useEffect(() => {
        fetchItems();
        fetchItemTypes();
        fetchQuantiTypes();
    }, [userId, jwtToken])


    const handleRefillItem = async (itemId: number, quantity: number) => {
        try {
            const response = await fetch(`/api/item/${itemId}/refill`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwtToken}`,
                },
                body: JSON.stringify({ quantity }),
            });

            if (!response.ok) throw new Error("Failed to refill item");
            fetchItems();
        } catch (error) {
            console.error("Error refilling item:", error);
        }
    };

    const handleDeleteItem = async (itemId: number) => {
        try {
            const response = await fetch(`/api/item/${itemId}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${jwtToken}` },
            });

            if (!response.ok) throw new Error("Failed to delete item");
            fetchItems();
        } catch (error) {
            console.error("Error deleting item:", error);
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
        <Box
            sx={{
                margin: "0 auto",
                border: "1px solid #ccc",
                borderRadius: "8px",
                background: `radial-gradient(circle at top, rgba(255, 236, 139, 0.8) 20%, rgba(219, 182, 61, 0.9) 40%),
                 linear-gradient(to bottom, rgba(219, 182, 61, 1) 30%, rgba(135, 206, 235, 1) 100%)`,
                width: "100%",
                height: "calc(89vh)",
                overflowY: "scroll",
                position: "relative",
                "&::-webkit-scrollbar": { display: "none" },
            }}
        >
            <AppBar position="sticky" sx={{ width: "100%", backgroundColor: "rgba(255, 236, 139)", borderRadius: "5px" }}>
                <Toolbar>
                    <IconButton
                        sx={{ color: "black", fontWeight: "medium" }}
                        color="inherit"
                        onClick={() => setDrawerOpen(true)}
                    >
                        Options
                        <ArrowRightIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                sx={{
                    "& .MuiDrawer-paper":
                        { width: "60vh", borderTop: "5px solid black", }
                }}>
                <List>
                    <ListItem >
                        <ListItemButton onClick={() => { setOpenCreateItem(true); setDrawerOpen(false); }}>
                            <ListItemText sx={{ fontWeight: "bold" }} primary="Create Item" />
                            <AddIcon />
                        </ListItemButton>
                    </ListItem>
                    <Divider variant="middle" sx={{ borderBottomWidth: 2 }} />
                    <ListItem>
                        <ListItemButton onClick={() => { setOpenCreateItemType(true); setDrawerOpen(false); }}>
                            <ListItemText primary="Create Item Type" />
                            <AddIcon />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>

            <ItemCreatorModal
                open={openCreateItem}
                handleClose={() => setOpenCreateItem(false)}
                newItemName={newItemName}
                setNewItemName={setNewItemName}
                newItemTypeId={newItemTypeId}
                setNewItemTypeId={setNewItemTypeId}
                newItemQuantityType={newItemQuantityType}
                setNewItemQuantityType={setNewItemQuantityType}
                newItemQuantity={newItemQuantity}
                setNewItemQuantity={setNewItemQuantity}
                itemTypes={itemTypes}
                quantityTypes={quantityTypes}
                handleCreateItem={handleCreateItem}
            />

            <ItemTypeCreatorModal
                {...{
                    open: openCreateItemType,
                    handleClose: () => setOpenCreateItemType(false),
                    newItemTypeName,
                    setNewItemTypeName,
                    handleCreateItemType
                }}
            />
            <Box
                sx={{
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
                }}
            >
                {items.map((item) => (
                    <ItemCard
                        key={item.id}
                        item={item}
                        onRefill={handleRefillItem}
                        onDelete={handleDeleteItem}
                    />
                ))}
            </Box>
        </Box>
    )
}

export default Storage;