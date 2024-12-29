import { Layouts } from "react-grid-layout";
import { APPS } from "../constants/apps";
import { AppType } from "@/constants/apps";



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

  export const fileCount = (list: AppType[], pathName: string) => {
    pathName = pathName.split('.')[0];
    const getCount = (name: string) => parseInt(name.replace(pathName, '').trim().replace('(', '').replace(')', ''));
    const newFolders = list.filter((a) => {
      const regex = new RegExp(`^${pathName}(\\s\\((\\d+)\\))?$`);
      return regex.test(a.name.split('.')[0]);
    }).sort((a, b) => getCount(a.name) - getCount(b.name));
    let lastFolderIndex = 0;
    // good enough for my sleep deprived brain, probably buggy, uhh nobody well ever stress it enough right?
    for(const [index, folder] of newFolders.entries()){
      const folderCount = getCount(folder?.name);
      if(!folderCount){ lastFolderIndex = 1; continue;}
      lastFolderIndex = index != folderCount ? index : index + 1;
    }
    return lastFolderIndex;
  }
  
  

  export const generateLayouts = (files?: AppType[] | null, layout?: Layouts): { layout: Layouts, apps: AppType[] } => {
    const windows = APPS.filter((a) => a.desktop);
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
        const existingItem = existingLayout.find(item => item.i === app.name);
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
          i: app.name,
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
  
  