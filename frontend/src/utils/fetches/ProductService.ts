export interface Product {
    id: number;
    name: string;
    items: ProductItem[];
    userId: number;
}

export interface ProductItem {
    itemId: number;
    itemName: string;
    quantity: number;
    quantityType: string;
}

export const fetchProducts = async (userId: number, token: string): Promise<Product[]> => {
    const response = await fetch(`/api/product/user/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) throw new Error("Failed to fetch products");
    return response.json();
};



export const createProduct = async (
    name: string,
    items: { itemId: number; quantity: number }[],
    userId: number,
    token: string
): Promise<void> => {
    const response = await fetch("/api/product/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, items, userId }),
    });

    if (!response.ok) throw new Error("Failed to create product");
};
