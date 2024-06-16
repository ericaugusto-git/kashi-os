import { createContext, useContext, useState } from "react"

const ThemeContext = createContext<ThemeContextType>([{value: "light", wallpaper: 0}, () => {}]);
type ThemeProviderType = {children: React.ReactNode}
type ThemeContextType = [Theme, React.Dispatch<React.SetStateAction<Theme>>]
export type Themes = 'light' | 'dark' | 'coffe';
export type Theme = {value: 'light' | 'dark' | 'coffe', wallpaper: number }

function ThemeProvider({children}: ThemeProviderType) {
  const localTheme = localStorage.getItem('theme');
  if(typeof localTheme === 'string'){
    localStorage.removeItem('theme');
  }
  const initialTheme: Theme = localStorage.getItem("theme") ? JSON.parse(localStorage.getItem('theme') as string) as Theme : {value: "light", wallpaper: 0};
  const [theme, setTheme] = useState<Theme>(initialTheme)
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
