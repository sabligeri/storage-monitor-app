export interface JwtUserData {
    id: number;
    jwt: string;
    username: string;
    roles: string[];
  }
  
  export const getUserData = (): JwtUserData | null => {
    const saved = localStorage.getItem("jwt-response");
    if (!saved) return null;
  
    try {
      return JSON.parse(saved) as JwtUserData;
    } catch (error) {
      console.error("Failed to parse jwt-response from localStorage", error);
      return null;
    }
  };
  