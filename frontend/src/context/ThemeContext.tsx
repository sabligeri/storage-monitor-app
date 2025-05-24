import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ThemeProvider as MuiThemeProvider, CssBaseline, createTheme } from "@mui/material";

// Ez csak alapérték, hogy a MUI ne boruljon fel
const muiLightTheme = createTheme({ palette: { mode: "light" } });
const muiDarkTheme = createTheme({ palette: { mode: "dark" } });

// Típus a context-hez
interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

// 🌍 Létrehozzuk a contextet
const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  toggleTheme: () => {},
});

// 🎣 Hook, amit a komponensek használhatnak
export const useThemeMode = () => useContext(ThemeContext);

// 🧠 A tényleges ThemeProvider komponens
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark((prev) => !prev);

  const theme = useMemo(() => (isDark ? muiDarkTheme : muiLightTheme), [isDark]);

  
useEffect(() => {
  document.body.setAttribute("data-theme", isDark ? "dark" : "light");
}, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
