import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Storage.css"
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ItemCreatorModal from "./ItemCreatorModal";
import AddIcon from '@mui/icons-material/Add';
import ItemTypeCreatorModal from "./ItemTypeCreatorModal";

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

    const savedData = localStorage.getItem("jwt-response");
    const parsedData = savedData ? JSON.parse(savedData) : null;
    const userId = parsedData?.id;
    const jwtToken = parsedData?.jwt;

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
        <div id="item-container">
            <AppBar position="static" sx={{ width: "fit-content", backgroundColor: "black", borderRadius: "5px" }}>
                <Toolbar>
                    <IconButton
                        sx={{ color: "white" }}
                        color="inherit"
                        onClick={() => setDrawerOpen(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                sx={{
                    "& .MuiDrawer-paper":
                        { width: "40vh", borderTop: "5px solid black", }
                }}>
                <List>
                    <ListItem >
                        <ListItemButton onClick={() => { setOpenCreateItem(true); setDrawerOpen(false); }}>
                            <ListItemText sx={{ fontWeight: "bold" }} primary="Create Item" />
                            <AddIcon />
                        </ListItemButton>
                    </ListItem>
                    <Divider variant="middle" sx={{borderBottomWidth: 2}}/>
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
            <div className="item-grid">
                {items.map((item) => (
                    <div className="item-card" key={item.id}>
                        <h4 className="item-name">{item.name} </h4>
                        <h5>{item.quantityType}: {item.quantity}</h5>
                        <h5>type: {item.itemType.name}</h5>
                        <button className="btn refill-btn">Refill</button>
                        <button className="btn delete-btn">Delete</button>
                    </div>
                ))}
            </div>
        </div >
    )
}

export default Storage;