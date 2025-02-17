import { useEffect, useState } from "react";
import "./StorageList.css";
import "./StorageCreator"
import StorageCreator from "./StorageCreator";
import StorageCard from "./StorageCard";
import DeleteStorageModal from "./DeleteStorageModal";

interface Storage {
    id: number;
    name: string;
}


const StorageList = () => {
    const [storages, setStorages] = useState<Storage[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [newStorageName, setNewStorageName] = useState<string>("");
    const [storageToDelete, setStorageToDelete] = useState<null | number>(null)

    const savedData = localStorage.getItem("jwt-response");
    const parsedData = savedData ? JSON.parse(savedData) : null;
    const userId = parsedData?.id;
    const jwtToken = parsedData?.jwt;

    const fetchStorages = async () => {
        if (!userId || !jwtToken) {
            setError("User id or token not found");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`/api/storage/user/${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwtToken}`,
                }
            })

            if (response.status === 204) {
                setStorages([]);
                return;
            }

            const data = await response.json();
            setStorages(data);

        } catch (error: unknown) {
            console.error(error)
            setError(" Error occured while fetching storages. --> " + error + " ");
        } finally {
            setLoading(false);
        }
    }

    const handleStorageCreate = async () => {
        if (!newStorageName.trim()) {
            return
        }
        try {
            const response = await fetch(`/api/storage/`, {
                method: "POST",
                body: JSON.stringify({ name: newStorageName, userId: userId }),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwtToken}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to create storage");
            }

            setNewStorageName("");
            fetchStorages();
        } catch (error) {
            console.error("Error creating storage:", error);
        }
    }

    const handleDeleteStorage = async (storageId: number) => {
        try {
            const response = await fetch(`/api/storage/${userId}/${storageId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${jwtToken}`
                }
            })
            if (!response.ok) {
                throw new Error("Failed to delete storage");
            }
            setStorageToDelete(null);
            fetchStorages();
        } catch (error) {
            console.error("Error deleting storage:", error)
        }
    }

    useEffect(() => {
        fetchStorages();
    }, [jwtToken, userId])


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
    
    console.log("Storage IDs:", storages.map(s => s.id));


    return (
        <div id="storage-list-container">
            <StorageCreator
                newStorageName={newStorageName}
                setNewStorageName={setNewStorageName}
                handleStorageCreate={handleStorageCreate}
            />
            {storages.map((storage) => (
                <StorageCard
                    key={storage.id}
                    storage={storage}
                    onDelete={setStorageToDelete}
                />
            ))}
            <DeleteStorageModal
                isOpen={storageToDelete !== null}
                onClose={() => setStorageToDelete(null)}
                onConfirm={() => storageToDelete !== null && handleDeleteStorage(storageToDelete)}
            />
        </div>
    )
}

export default StorageList;