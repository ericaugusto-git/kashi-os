import { lazy } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const componentMap: Record<string, () => Promise<any>> = {
  "@/StartMenu/components/Playlist/Playlist": () => import("../StartMenu/components/Playlist/Playlist"),
  "@/StartMenu/components/Cmd/Cmd": () => import("../StartMenu/components/Cmd/Cmd"),
  "@/StartMenu/components/Credits/Credits": () => import("../StartMenu/components/Credits/Credits"),
  "@/StartMenu/components/Paint/Paint": () => import("../StartMenu/components/Paint/Paint"),
  "@/EmulatorJS/EmulatorJS": () => import("../EmulatorJS/EmulatorJS"),
  "@/Audio/Audio": () => import("../Audio/Audio"),
  "@/Resume/Resume": () => import("../Resume/Resume"),
  "@/Folder/Folder": () => import("../Folder/Folder"),
};

export const loadComponent = (componentPath: string) => {
  const importFn = componentMap[componentPath];
  if (!importFn) {
    throw new Error(`Component ${componentPath} not found in component map`);
  }
  return lazy(importFn);
}; 