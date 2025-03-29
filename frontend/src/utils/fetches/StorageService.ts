interface Storage {
    id: number;
    name: string;
}

const API_BASE = "/api/storage";

export const fetchStorages = async (userId: number, token: string): Promise<Storage[]> => {
    const response = await fetch(`${API_BASE}/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status === 204) return [];
    if (!response.ok) throw new Error("Failed to fetch storages");

    return response.json();
};

export const createStorage = async (
    name: string,
    userId: number,
    token: string
): Promise<void> => {
    const response = await fetch(`${API_BASE}/`, {
        method: "POST",
        body: JSON.stringify({ name, userId }),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) throw new Error("Failed to create storage");
};

export const deleteStorage = async (
    userId: number,
    storageId: number,
    token: string
): Promise<void> => {
    const response = await fetch(`${API_BASE}/${userId}/${storageId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error("Failed to delete storage");
};
