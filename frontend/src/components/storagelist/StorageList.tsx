import { useEffect, useState } from "react";
import {
    Box,
    Fab,
    Typography,
    Paper,
    Tooltip
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import StorageCreator from "./StorageCreator";
import StorageCard from "./StorageCard";
import DeleteStorageModal from "./DeleteStorageModal";
import { LoadingScreen, ErrorScreen } from "../../utils/LoadingAndError";
import { getUserData } from "../../utils/getUserData";
import { fetchStorages as fetchStoragesAPI, createStorage, deleteStorage } from "../../utils/fetches/StorageService";

interface Storage {
    id: number;
    name: string;
}

const StorageList = () => {
    const [storages, setStorages] = useState<Storage[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [newStorageName, setNewStorageName] = useState<string>("");
    const [storageToDelete, setStorageToDelete] = useState<null | number>(null);
    const [creatorOpen, setCreatorOpen] = useState<boolean>(false);

    const userData = getUserData();
    const userId = userData?.id;
    const jwtToken = userData?.jwt;

    const fetchStorages = async () => {
        if (!userId || !jwtToken) {
            setError("User id or token not found");
            setLoading(false);
            return;
        }

        try {
            const data = await fetchStoragesAPI(userId, jwtToken);
            setStorages(data);
        } catch (error) {
            console.error(error);
            setError("Error occurred while fetching storages.");
        } finally {
            setLoading(false);
        }
    };

    const handleStorageCreate = async () => {
        if (!newStorageName.trim() || !userId || !jwtToken) return;

        try {
            await createStorage(newStorageName, userId, jwtToken);
            setNewStorageName("");
            setCreatorOpen(false);
            fetchStorages();
        } catch (error) {
            console.error("Error creating storage:", error);
        }
    };

    const handleDeleteStorage = async (storageId: number) => {
        if (!userId || !jwtToken) return;

        try {
            await deleteStorage(userId, storageId, jwtToken);
            setStorageToDelete(null);
            fetchStorages();
        } catch (error) {
            console.error("Error deleting storage:", error);
        }
    };

    useEffect(() => {
        fetchStorages();
    }, [userId, jwtToken]);

    if (loading) return <LoadingScreen />;
    if (error) return <ErrorScreen error={error} />;

    return (
        <Box
            sx={{
                p: 4,
                backgroundColor: "#E4E4DE",
                minHeight: "83vh",
                position: "relative",
            }}
        >
            <Tooltip title="Add New Storage">
                <Fab
                    size="medium"
                    onClick={() => setCreatorOpen((prev) => !prev)}
                    sx={{
                        position: "absolute",
                        top: 16,
                        left: 16,
                        backgroundColor: "#595f39",
                        color: "#E4E4DE",
                        "&:hover": {
                            backgroundColor: "#1B1B1B",
                        },
                    }}
                >
                    <AddIcon />
                </Fab>
            </Tooltip>

            <Typography
                variant="h5"
                fontWeight="bold"
                mb={3}
                textAlign="center"
                color="#1B1B1B"
            >
                Your Storages
            </Typography>

            <StorageCreator
                open={creatorOpen}
                onToggle={() => setCreatorOpen(false)}
                newStorageName={newStorageName}
                setNewStorageName={setNewStorageName}
                handleStorageCreate={handleStorageCreate}
            />

            <Paper
                elevation={3}
                sx={{
                    p: 3,
                    backgroundColor: "#C4C5BA", // Sophisticated Sage
                    maxHeight: "68vh",
                    overflowY: "auto",
                }}
            >
                {storages.length > 0 ? (
                    storages.map((storage) => (
                        <StorageCard key={storage.id} storage={storage} onDelete={setStorageToDelete} />
                    ))
                ) : (
                    <Typography color="#1B1B1B">No storages found. Click on the + icon to create your first storage!</Typography>
                )}
            </Paper>
            <DeleteStorageModal
                isOpen={storageToDelete !== null}
                onClose={() => setStorageToDelete(null)}
                onConfirm={() => {
                    if (storageToDelete !== null) handleDeleteStorage(storageToDelete);
                }}
            />

        </Box>

    );
};

export default StorageList;
