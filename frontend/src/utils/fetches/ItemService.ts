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

const ITEM_BASE = "/api/item";
const ITEM_TYPE_BASE = "/api/itemType";
const QUANTITY_TYPE_BASE = "/api/quantity-types/";

export const fetchItems = async (storageId: string, token: string): Promise<Item[]> => {
    const response = await fetch(`/api/storage/${storageId}/items`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.status === 204) return [];
    if (!response.ok) throw new Error("Failed to fetch items");
    return response.json();
};

export const fetchItemTypes = async (userId: number, token: string): Promise<ItemType[]> => {
    const response = await fetch(`${ITEM_TYPE_BASE}/user/${userId}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.status === 204) return [];
    if (!response.ok) throw new Error("Failed to fetch item types");
    return response.json();
};

export const fetchQuantityTypes = async (): Promise<string[]> => {
    const response = await fetch(QUANTITY_TYPE_BASE, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) throw new Error("Failed to fetch quantity types");
    return response.json();
};

export const createItem = async (
    name: string,
    quantity: number,
    quantityType: string,
    storageId: string,
    itemTypeId: number,
    token: string
): Promise<void> => {
    const response = await fetch(`${ITEM_BASE}/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            name,
            quantity,
            quantityType,
            storageId,
            itemTypeId,
        }),
    });

    if (!response.ok) throw new Error("Failed to create item");
};

export const createItemType = async (
    name: string,
    userId: number,
    token: string
): Promise<void> => {
    const response = await fetch(`${ITEM_TYPE_BASE}/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, userId }),
    });

    if (!response.ok) throw new Error("Failed to create item type");
};

export const refillItem = async (
    itemId: number,
    quantity: number,
    token: string
): Promise<void> => {
    const response = await fetch(`${ITEM_BASE}/${itemId}/refill`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity }),
    });

    if (!response.ok) throw new Error("Failed to refill item");
};

export const deleteItem = async (
    itemId: number,
    token: string
): Promise<void> => {
    const response = await fetch(`${ITEM_BASE}/${itemId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) throw new Error("Failed to delete item");
};
