import { createContext, useContext, useState } from "react"

const ThemeContext = createContext<ThemeContextType>(["light", () => {}]);
type ThemeProviderType = {children: React.ReactNode}
type ThemeContextType = [string, React.Dispatch<React.SetStateAction<string>>]


function ThemeProvider({children}: ThemeProviderType) {
  const initialTheme = localStorage.getItem("theme") ?? "light";
  const [theme, setTheme] = useState(initialTheme)
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
