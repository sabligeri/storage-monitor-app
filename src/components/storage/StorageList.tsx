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

    const savedData = localStorage.getItem("jwt-response");
    const parsedData = savedData ? JSON.parse(savedData) : null;
    const userId = parsedData?.id;
    const jwtToken = parsedData?.jwt;


    useEffect(() => {
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

                if (response.status === 204) { // Ha nincs tartalom
                    setStorages([]); // Üres tároló lista
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

        fetchStorages();
    }, [jwtToken, userId, storages])


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
            {storages.length === 0 ? (
                <p style={{"color":"white"}}>Nincs elérhető tároló.</p>
            ) : (
                storages.map((storage) => (
                    <div key={storage.id} className="storage-card">
                        <div className="storage-name">
                            {storage.name}
                        </div>
                        <div className="storage-actions">
                            <button className="btn update-btn">Update</button>
                            <button className="btn delete-btn">Delete</button>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

export default StorageList;