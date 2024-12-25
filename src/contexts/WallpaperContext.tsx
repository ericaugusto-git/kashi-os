import { createContext, useContext, useState } from "react"
import { useTheme } from "./ThemeContext";
import { wallpapers } from "@/constants/wallpapers";

const WallpaperContext = createContext<WallpaperContextType>([null, () => {}]);
type WallpaperProviderType = {children: React.ReactNode}
type WallpaperContextType = [string | null, React.Dispatch<React.SetStateAction<string | null>>]

function WallpaperProvider({children}: WallpaperProviderType) {
  const [theme] = useTheme();
  const localWallper = localStorage.getItem(theme + "_wallpaper");
  const initialWallpaper = localWallper ? localWallper : null;
  
  const [wallpaper, setWallpaper] = useState<string | null>(initialWallpaper)
  return (
    <WallpaperContext.Provider value={[wallpaper, setWallpaper]}>
      {children}
    </WallpaperContext.Provider>
  )
}

function useWallpaper() {
  const context = useContext(WallpaperContext);
  if (context === undefined) {
    throw new Error('useWallpaper must be used within a WallpaperProvider')
  }

  return context;
}

export {WallpaperProvider, useWallpaper}
