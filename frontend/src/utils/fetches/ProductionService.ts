export const simulateProduction = async (
    productId: number,
    quantity: number,
    token: string
  ): Promise<{ message?: string; error?: string }> => {
    const response = await fetch("/api/production/simulate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId, quantity }),
    });
  
    const result = await response.json();
  
    if (!response.ok) {
      return { error: result.error || "Simulation failed." };
    }
  
    return { message: result.message };
  };
  