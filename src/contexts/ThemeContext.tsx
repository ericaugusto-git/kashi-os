import { createContext, useContext, useState } from "react"
import { wallpapers } from "../constants/wallpapers";

const ThemeContext = createContext<ThemeContextType>(["dark", () => {}]);
type ThemeProviderType = {children: React.ReactNode}
type ThemeContextType = [string, React.Dispatch<React.SetStateAction<string>>]


function ThemeProvider({children}: ThemeProviderType) {
  let initialTheme: string = (localStorage.getItem("theme") as string) ?? "dark";
  if(!wallpapers[initialTheme]){
    initialTheme = 'dark'
  }
  const [theme, setTheme] = useState<string>(initialTheme)
  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {children}
    </ThemeContext.Provider>
  )
}

function useTheme() {
  const context = useContext(ThemeContext)
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export {ThemeProvider, useTheme}
