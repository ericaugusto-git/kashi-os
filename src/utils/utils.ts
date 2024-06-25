import { Themes } from "../contexts/ThemeContext";

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