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
import {
  fetchItems as fetchItemsAPI,
  fetchItemTypes,
  fetchQuantityTypes,
  createItem,
  createItemType,
  refillItem,
  deleteItem,
} from "../../utils/fetches/ItemService";
import { useThemeMode } from "../../context/ThemeContext";
import { light, dark } from "./theme";



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

  const { isDark } = useThemeMode();
  const theme = isDark ? dark : light;

  const fetchItems = async () => {
    if (!storageId || !jwtToken) return;

    try {
      const data = await fetchItemsAPI(storageId, jwtToken);
      setItems(data);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch items.");
    }
  };

  const fetchAll = async () => {
    if (!userId || !jwtToken) {
      setError("User id or token not found");
      setLoading(false);
      return;
    }

    try {
      const [itemsData, typesData, quantityData] = await Promise.all([
        fetchItemsAPI(storageId!, jwtToken),
        fetchItemTypes(userId, jwtToken),
        fetchQuantityTypes(),
      ]);

      setItems(itemsData);
      setItemTypes(typesData);
      setQuantityTypes(quantityData);
    } catch (err) {
      console.error(err);
      setError("Error loading data.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateItem = async () => {
    if (!newItemName.trim() || newItemTypeId <= 0 || !newItemQuantityType.trim() || newItemQuantity < 0 || !storageId || !jwtToken) return;

    try {
      await createItem(newItemName, newItemQuantity, newItemQuantityType, storageId, newItemTypeId, jwtToken);
      setNewItemName("");
      setNewItemTypeId(0);
      setNewItemQuantityType("");
      setNewItemQuantity(0);
      fetchItems();
      setOpenCreateItem(false);
    } catch (error) {
      setError("Error occurred while creating item: " + error);
    }
  };

  const handleCreateItemType = async () => {
    if (!newItemTypeName.trim() || !userId || !jwtToken) return;

    try {
      await createItemType(newItemTypeName, userId, jwtToken);
      setNewItemTypeName("");
      fetchAll();
      setOpenCreateItemType(false);
    } catch (error) {
      setError("Error occurred while creating item type: " + error);
    }
  };

  const handleRefillItem = async (itemId: number, quantity: number) => {
    if (!jwtToken) return;
    try {
      await refillItem(itemId, quantity, jwtToken);
      fetchItems();
    } catch (error) {
      console.error("Error refilling item:", error);
    }
  };

  const handleDeleteItem = async (itemId: number) => {
    if (!jwtToken) return;
    try {
      await deleteItem(itemId, jwtToken);
      fetchItems();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  useEffect(() => {
    fetchAll();
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
    <Box
      sx={{
        margin: "0 auto",
        border: "1px solid #ccc",
        background: theme.background,
        width: "100%",
        height: "calc(100vh - 4rem)",
        overflowY: "scroll",
        position: "relative",
        "&::-webkit-scrollbar": { display: "none" },
        mt: "4rem",
      }}
    >
      <AppBar position="sticky" sx={{ width: "100%", backgroundColor: theme.drawerBorder, borderRadius: "5px" }}>
        <Toolbar>
          <IconButton
            sx={{ color: theme.cardText, fontWeight: "medium" }}
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
          "& .MuiDrawer-paper": {
            width: "60vh",
            borderTop: `5px solid ${theme.buttonBackground}`,
            backgroundColor: theme.drawerBackground,
            paddingTop: 2,
          }
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