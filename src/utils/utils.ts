import { Layouts } from "react-grid-layout";
import { windowsTemplates } from "../constants/windowsTemplate";
import { Themes } from "../contexts/ThemeContext";
import { WindowType } from "@/constants/window";

export function getWppIndex(theme: Themes){
    const localWallper = localStorage.getItem(theme + "Wallpaper");
    const index: number = localWallper ? Number(localWallper) : 0;
    return index;
}

export const fetchGif = async (gifId: string) => {
    try {
      const cache = localStorage.getItem(gifId);
      if(cache){
        return cache;
      }
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/${gifId}?api_key=${
          import.meta.env.VITE_REACT_GIPHY_API_KEY
        }`
      );
      const data = await response.json();
      const gifUrl = data.data.images.original.url;
      console.log(gifId)
      localStorage.setItem(gifId, gifUrl);
      return gifUrl;
    } catch (error) {
      console.error("Error fetching the GIF:", error);
    }
  };

  export const fetchReadme = async () => {
    const owner = 'ericaugusto-git';
    const repo = 'portfolio-os';
    const path = 'README.md';
    const token = import.meta.env.VITE_REACT_GITHUB_TOKEN;

    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Decode base64 and properly handle UTF-8 encoding
        const decoded = atob(data.content);
        const decoder = new TextDecoder('utf-8');
        const bytes = new Uint8Array(decoded.split('').map(char => char.charCodeAt(0)));
        return decoder.decode(bytes);
      } else {
        console.error('Error fetching README:', response.status, response.statusText);
        return null;
      }
    } catch (error) {
      console.error('Error fetching README:', error);
      return null;
    }
  };
  
  

  export const generateLayouts = (files?: WindowType[] | null, layout?: Layouts): { layout: Layouts, apps: WindowType[] } => {
    const windows = windowsTemplates.filter((a) => a.desktop);
    const apps = files ? [...windows, ...files] : windows;
    let savedLayouts: Layouts | string | null = localStorage.getItem('app-layouts');
  
    if (savedLayouts && !layout) {
      savedLayouts = JSON.parse(savedLayouts);
      return { layout: savedLayouts as Layouts, apps };
    }
  
    layout = layout ? JSON.parse(JSON.stringify(layout)) as Layouts : {};
    const breakpoints: Array<keyof Layouts> = ['lg', 'md', 'sm', 'xs', 'xxs'];
    const rowHeight = 130;
    const screenHeight = window.innerHeight - rowHeight // substract the row height to account for the taskbar
    const maxRows = Math.floor(screenHeight / rowHeight);
  
    breakpoints.forEach((breakpoint) => {
      const existingLayout = layout[breakpoint] || [];
      const occupiedPositions = new Set(existingLayout.map(item => `${item.x}-${item.y}`));
      const newLayout = apps.map((app) => {
        // Check if the app already exists in the layout to retain its position
        const existingItem = existingLayout.find(item => item.i === app.app);
        if (existingItem) return existingItem;
  
        // Start searching for the next available position
        let position = 0;
        let x, y;
        do {
          x = Math.floor(position / maxRows);
          y = position % maxRows;
          position++;
        } while (occupiedPositions.has(`${x}-${y}`));
  
        // Mark the found position as occupied
        occupiedPositions.add(`${x}-${y}`);
        return {
          i: app.app,
          x,
          y,
          w: 1,
          h: 1,
          minW: 1,
          minH: 1,
        };
      });
      layout[breakpoint] =  JSON.parse(JSON.stringify(newLayout));
    });
    return { layout, apps };
  };
  
  