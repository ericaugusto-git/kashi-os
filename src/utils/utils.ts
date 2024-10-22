import { WindowType } from "@/constants/window";
import { Layouts } from "react-grid-layout";
import { Themes } from "../contexts/ThemeContext";
import { windowsTemplates } from "../constants/windowsTemplate";

export function getWppIndex(theme: Themes){
    const localWallper = localStorage.getItem(theme + "Wallpaper");
    const index: number = localWallper ? Number(localWallper) : 0;
    return index;
}

export const fetchGif = async (gifId: string) => {
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/${gifId}?api_key=${
          import.meta.env.VITE_REACT_GIPHY_API_KEY
        }`
      );
      const data = await response.json();
      return data.data.images.original.url;
    } catch (error) {
      console.error("Error fetching the GIF:", error);
    }
  };

export   const generateLayouts = (): Layouts => {
  const apps  = windowsTemplates.filter((a) => a.appType === 'project' || a.desktop);
  let savedLayouts: Layouts | string | null = localStorage.getItem('app-layouts');
  if(savedLayouts){
    savedLayouts = JSON.parse(savedLayouts);
    return savedLayouts as Layouts;
  }
  const layouts: Layouts = {};
  const breakpoints: Array<keyof Layouts> = ['lg', 'md', 'sm', 'xs', 'xxs'];

  breakpoints.forEach((breakpoint) => {
    layouts[breakpoint] = apps.map((app, index) => ({
      i: app.app,
      x: 0,
      y: index,
      w: 1,
      h: 1,
      minW: 1,
      minH: 1,
    }));
  });

  return layouts;
}; 