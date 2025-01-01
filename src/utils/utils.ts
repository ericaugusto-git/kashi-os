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
  
  export function toValidJsonKey(input: string): string {
    if (typeof input !== "string") {
      throw new Error("Input must be a string");
    }
  
    // Remove leading/trailing whitespace
    let sanitized = input.trim();
  
    // Replace invalid characters (anything not alphanumeric or underscore) with underscores
    sanitized = sanitized.replace(/[^a-zA-Z0-9_]/g, "_");
  
    // Ensure it doesn't start with a number
    if (/^\d/.test(sanitized)) {
      sanitized = "_" + sanitized;
    }
    // Return the sanitized key
    return sanitized;
  }
  
  
