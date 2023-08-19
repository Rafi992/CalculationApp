import { ReactNode, createContext, useContext, useState } from "react";

interface ThemeContextType {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialThemeContext: ThemeContextType = {
  // @ts-ignore
  darkMode: JSON.parse(localStorage.getItem("darkMode")),
  setDarkMode: () => {},
};

export const ThemeContext =
  createContext<ThemeContextType>(initialThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [darkMode, setDarkMode] = useState<boolean>(
    // @ts-ignore
    JSON.parse(localStorage.getItem("darkMode"))
  );

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}
