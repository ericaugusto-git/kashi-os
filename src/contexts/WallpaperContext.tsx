import { createContext, useContext, useState } from "react"
import { useTheme } from "./ThemeContext";

const WallpaperContext = createContext<WallpaperContextType>([0, () => {}]);
type WallpaperProviderType = {children: React.ReactNode}
type WallpaperContextType = [number, React.Dispatch<React.SetStateAction<number>>]

function WallpaperProvider({children}: WallpaperProviderType) {
  const [theme] = useTheme();
  const localWallper = localStorage.getItem(theme + "Wallpaper");
  const initialWallpaper: number = localWallper ? Number(localWallper) : 0;
  
  const [wallpaperIndex, setWallpaper] = useState<number>(initialWallpaper)
  return (
    <WallpaperContext.Provider value={[wallpaperIndex, setWallpaper]}>
      {children}
    </WallpaperContext.Provider>
  )
}

function useWallpaper() {
  const context = useContext(WallpaperContext)
  
  if (context === undefined) {
    throw new Error('useWallpaper must be used within a WallpaperProvider')
  }
  return context
}

export {WallpaperProvider, useWallpaper}
