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
    const [itemTypes, setItemTypes] = useState<ItemType[]>([]);
    const [quantityTypes, setQuantityTypes] = useState<string[]>([])

    const [newItemName, setNewItemName] = useState<string>("");
    const [newItemTypeId, setNewItemTypeId] = useState<number>(0);
    const [newItemQuantityType, setNewItemQuantityType] = useState<string>("");
    const [newItemQuantity, setNewItemQuantity] = useState<number>(0);

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
        if(!newItemName.trim() || newItemTypeId <= 0 || !newItemQuantityType.trim() || newItemQuantity < 0) {
            return;
        }

        try{
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
                    itemTypeId: newItemTypeId}),
            })

            if(!response.ok) {
                setError("Failed to create item");
                throw new Error("Failed to create item");
            }

            setNewItemName("");
            setNewItemTypeId(0);
            setNewItemQuantityType("");
            setNewItemQuantity(0);
            fetchItems();
        } catch(error) {
            setError("Error occured while creating Item: \n" + error);
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
            <div id="item-creator-container">
                <label htmlFor="create-item-input">
                    Create Item
                </label>
                <input
                    id="create-item-input"
                    type="text"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    placeholder="Enter item's name..."
                />
                <select
                    name="quantity-type-selector"
                    id="quantity-type-selector"
                    value={newItemQuantityType}
                    onChange={(e) => setNewItemQuantityType(e.target.value)}
                >
                    <option>Select Quantity Type</option>
                    {quantityTypes.map((quantityType) => (
                        <option value={quantityType}>{quantityType}</option>
                    ))}
                </select>
                <input
                    type="number"
                    id="quantity-input"
                    value={newItemQuantity}
                    onChange={(e) => setNewItemQuantity(Number(e.target.value))}
                    placeholder="Enter quantity"
                />
                <select
                    name="item-type-selector"
                    id="item-type-selector"
                    value={newItemTypeId}
                    onChange={(e) => setNewItemTypeId(Number(e.target.value))}
                >
                    <option>Select type</option>
                    {itemTypes.map((itemType) => (
                        <option value={itemType.id}>{itemType.name}</option>
                    ))}
                </select>
                <button className="btn create-item-btn" onClick={() => handleCreateItem()}> Create</button>
            </div>
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