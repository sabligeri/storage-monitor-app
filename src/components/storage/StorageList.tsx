import { useEffect, useState } from "react";
import "./StorageList.css";

interface Storage {
    id: number;
    name: string;
}


const StorageList = () => {
    const [storages, setStorages] = useState<Storage[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [newStorageName, setNewStorageName] = useState<string>("");

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

    return (
        <div className="storage-list-container">
            <div id="storage-creator-container">
                <label htmlFor="">
                    Create Storage
                </label>
                <input
                    id="create-storage-input"
                    type="text"
                    value={newStorageName}
                    onChange={(e) => setNewStorageName(e.target.value)}
                    placeholder="Enter storage name"
                />

                <button id="create-storage-button" onClick={() => handleStorageCreate()}>
                    <i className="bi bi-plus-lg"></i> Create Storage
                </button>
            </div>
            {storages.map((storage) => (
                <div key={storage.id} className="storage-card">
                    <div className="storage-name">
                        {storage.name}
                    </div>
                    <div className="storage-actions">
                        <button className="btn update-btn">
                            <i className="bi bi-folder2-open"></i> Open
                        </button>
                        <button className="btn delete-btn">
                            <i className="bi bi-trash3"></i> Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default StorageList;