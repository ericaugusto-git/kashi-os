
import { lazy } from 'react';

// Gotta do static imports because of https://stackoverflow.com/questions/72376333/failed-to-fetch-dynamically-imported-module
// Also this map exists because I set the path of the components both on FileSystemContext and in windowsTemplate so it's easier to manage this way
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const componentMap: Record<string, () => Promise<any>> = {
  "@/StartMenu/components/Playlist/Playlist": () => import("../StartMenu/components/Playlist/Playlist"),
  "@/StartMenu/components/Cmd/Cmd": () => import("../StartMenu/components/Cmd/Cmd"),
  "@/StartMenu/components/Credits/Credits": () => import("../StartMenu/components/Credits/Credits"),
  "@/StartMenu/components/Paint/Paint": () => import("../StartMenu/components/Paint/Paint"),
  "@/EmulatorJS/EmulatorJS": () => import("../EmulatorJS/EmulatorJS"),
  "@/Audio/Audio": () => import("../Audio/Audio"),
  "@/Folder/Folder": () => import("../Folder/Folder"),
  "@/Monaco/Monaco": () => import("../Monaco/Monaco"),
  "@/Photo/Photo": () => import("../Photo/Photo"),
  "@/Video/Video": () => import("../Video/Video"),
  "@/Pdf/Pdf": () => import("../Pdf/Pdf"),
  "@/UnderDev/UnderDev": () => import("../UnderDev/UnderDev"),
  "@/Markdown/Markdown": () => import("../Markdown/Markdown")
};

export const loadComponent = (componentPath: string) => {
  const importFn = componentMap[componentPath];
  if (!importFn) {
    throw new Error(`Component ${componentPath} not found in component map`);
  }
  return lazy(importFn);
}; 


// Old cooler version that is not consistent in production :(
// import { lazy } from 'react';

// export const loadComponent = (componentPath: string) => {
//   // Remove the @ prefix and handle the path properly
//   const normalizedPath = componentPath.replace('@/', '../');
  
//   return lazy(() => {
//     // Using dynamic import with proper path resolution
//     return import(/* @vite-ignore */ normalizedPath + '.tsx')
//       .then(module => ({ default: module.default }))
//       .catch(error => {
//         console.error(`Error loading component ${componentPath}:`, error);
//         throw error;
//       });
//   });
// }; 

