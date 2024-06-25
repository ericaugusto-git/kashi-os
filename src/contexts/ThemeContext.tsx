import { createContext, useContext, useState } from "react"
import { wallpapers } from "../constants/wallpapers";

const ThemeContext = createContext<ThemeContextType>(["light", () => {}]);
type ThemeProviderType = {children: React.ReactNode}
type ThemeContextType = [Themes, React.Dispatch<React.SetStateAction<Themes>>]
export type Themes = 'light' | 'dark' | 'cozy' 


function ThemeProvider({children}: ThemeProviderType) {
  let initialTheme: Themes = (localStorage.getItem("theme") as Themes) ?? "light";
  if(!wallpapers[initialTheme]){
    initialTheme = 'light'
  }
  const [theme, setTheme] = useState<Themes>(initialTheme)
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
