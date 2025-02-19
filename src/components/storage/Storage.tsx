import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Storage.css"

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
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchItems();
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
        </div>
    )
}

export default Storage;